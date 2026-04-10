package engine

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

// TokenService signs and verifies HMAC-SHA256 tokens.
type TokenService struct {
	Secret string
}

func NewTokenService(secret string) *TokenService {
	return &TokenService{Secret: secret}
}

func base64urlEncode(data []byte) string {
	return base64.RawURLEncoding.EncodeToString(data)
}

// Base64urlEncodePublic is exported for testing.
func Base64urlEncodePublic(data []byte) string {
	return base64urlEncode(data)
}

func base64urlDecode(s string) ([]byte, error) {
	return base64.RawURLEncoding.DecodeString(s)
}

func (t *TokenService) hmacSHA256(data string) string {
	mac := hmac.New(sha256.New, []byte(t.Secret))
	mac.Write([]byte(data))
	return base64urlEncode(mac.Sum(nil))
}

// SignToken creates a signed token from a payload.
func (t *TokenService) SignToken(payload interface{}) (string, error) {
	jsonBytes, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}
	encoded := base64urlEncode(jsonBytes)
	sig := t.hmacSHA256(encoded)
	return encoded + "." + sig, nil
}

// VerifyToken verifies a token and returns the payload.
func (t *TokenService) VerifyToken(token string) (map[string]interface{}, error) {
	parts := strings.SplitN(token, ".", 2)
	if len(parts) != 2 {
		return nil, ErrInvalidToken
	}

	encoded := parts[0]
	sig := parts[1]

	expectedSig := t.hmacSHA256(encoded)
	if !hmac.Equal([]byte(sig), []byte(expectedSig)) {
		return nil, ErrInvalidToken
	}

	jsonBytes, err := base64urlDecode(encoded)
	if err != nil {
		return nil, ErrInvalidToken
	}

	var payload map[string]interface{}
	if err := json.Unmarshal(jsonBytes, &payload); err != nil {
		return nil, ErrInvalidToken
	}

	if exp, ok := payload["exp"].(float64); ok {
		if int64(exp) < time.Now().UnixMilli() {
			return nil, ErrTokenExpired
		}
	}

	return payload, nil
}

// SignURL creates a signed URL.
func (t *TokenService) SignURL(path string, ttlMs int64) string {
	expiresAt := time.Now().UnixMilli() + ttlMs
	payload := fmt.Sprintf("%s:%d", path, expiresAt)
	mac := hmac.New(sha256.New, []byte(t.Secret))
	mac.Write([]byte(payload))
	sig := base64urlEncode(mac.Sum(nil))

	sep := "?"
	if strings.Contains(path, "?") {
		sep = "&"
	}
	return fmt.Sprintf("%s%ssig=%s&exp=%d", path, sep, sig, expiresAt)
}

// Errors
type tokenError string

func (e tokenError) Error() string { return string(e) }

const (
	ErrInvalidToken tokenError = "invalid token"
	ErrTokenExpired tokenError = "token expired"
)
