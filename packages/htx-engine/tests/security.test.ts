import { expect, test } from "bun:test";

import { ActionTokenService, InMemoryReplayGuard } from "../src";

const TEST_KEY = "test-secret-key-at-least-32-bytes-long!!";

test("issues tokens with expected claims and unique jti values", async () => {
  const service = new ActionTokenService(TEST_KEY);

  const first = await service.issue("site:1", "save");
  const second = await service.issue("site:1", "save");
  const decoded = service.decode(first.token);

  expect(first.token.length).toBeGreaterThan(0);
  expect(first.jti).not.toBe(second.jti);
  expect(decoded.sub).toBe("site:1");
  expect(decoded["htx-context"]).toBe("save");
  expect(decoded["htx-recordId"]).toBeNull();
});

test("validates token claims and rejects context/record mismatches", async () => {
  const service = new ActionTokenService(TEST_KEY);
  const issued = await service.issue("site:1", "update", "123");
  const decoded = await service.validate(issued.token, "update", "123");

  expect(decoded["htx-recordId"]).toBe("123");
  await expect(service.validate(issued.token, "delete", "123")).rejects.toThrow(/Context mismatch/);
  await expect(service.validate(issued.token, "update", "999")).rejects.toThrow(/Record ID mismatch/);
});

test("rejects invalid signature and expired token", async () => {
  const service = new ActionTokenService(TEST_KEY);
  const wrongKeyService = new ActionTokenService("wrong-key-that-is-also-32-bytes!!");
  const issued = await service.issue("site:1", "save");

  await expect(wrongKeyService.validate(issued.token, "save")).rejects.toThrow(
    /Invalid action token/,
  );

  const expiredService = new ActionTokenService(TEST_KEY, 0);
  const expired = await expiredService.issue("site:1", "save");
  await Bun.sleep(1000);
  await expect(service.validate(expired.token, "save")).rejects.toThrow(/Invalid action token/);
});

test("replay guard tracks and cleans used tokens", async () => {
  const replayGuard = new InMemoryReplayGuard();
  const service = new ActionTokenService(TEST_KEY);
  const issued = await service.issue("site:1", "save");

  expect(replayGuard.isReplayed(issued.jti)).toBe(false);
  replayGuard.markUsed(issued.jti, issued.expires_at);
  expect(replayGuard.isReplayed(issued.jti)).toBe(true);

  replayGuard.markUsed("expired-jti", "2020-01-01 00:00:00");
  expect(replayGuard.cleanup()).toBe(1);
  expect(replayGuard.isReplayed("expired-jti")).toBe(false);
  expect(replayGuard.count()).toBe(1);

  replayGuard.reset();
  expect(replayGuard.count()).toBe(0);
});

test("full prepare execute lifecycle remains single use", async () => {
  const service = new ActionTokenService(TEST_KEY);
  const replayGuard = new InMemoryReplayGuard();

  const issued = await service.issue("site:1", "save");
  const decoded = await service.validate(issued.token, "save");

  expect(replayGuard.isReplayed(decoded.jti)).toBe(false);
  replayGuard.markUsed(decoded.jti, issued.expires_at);
  expect(replayGuard.isReplayed(decoded.jti)).toBe(true);
});
