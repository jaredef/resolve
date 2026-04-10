CC = gcc
SRC = src/attention.c src/model.c src/derive_weights.c
TEST = tests/test_all.c
HEADERS = src/types.h src/math_util.h src/attention.h src/model.h

.PHONY: test serve clean

test: pi-resolver-test
	./pi-resolver-test

serve: pi-resolver-server
	./pi-resolver-server

pi-resolver-test: $(TEST) $(SRC) $(HEADERS)
	$(CC) -O2 -Wall -Wextra -std=c11 -I src -o $@ $(TEST) $(SRC) -lm

pi-resolver-server: src/server.c $(SRC) $(HEADERS)
	$(CC) -O2 -Wall -Wextra -std=c11 -I src -o $@ src/server.c $(SRC) -lm

train: pi-resolver-train
	./pi-resolver-train

pi-resolver-train: src/train.c $(SRC) $(HEADERS)
	$(CC) -O2 -Wall -Wextra -std=c11 -I src -o $@ src/train.c $(SRC) -lm

train-recursive: pi-resolver-train-recursive
	./pi-resolver-train-recursive

pi-resolver-train-recursive: src/train_recursive.c $(SRC) $(HEADERS)
	$(CC) -O2 -Wall -Wextra -std=c11 -I src -o $@ src/train_recursive.c $(SRC) -lm

clean:
	rm -f pi-resolver-test pi-resolver-server pi-resolver-train pi-resolver-train-recursive
