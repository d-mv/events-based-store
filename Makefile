.PHONY: start
start:
	docker compose -p events-based-store up

.PHONY: build-start
build-start:
	docker compose kill || true
	docker compose -p events-based-store build
	docker compose -p events-based-store up

.PHONY: re-build-start
re-build-start:
	docker compose kill || true
	docker compose -p events-based-store build --no-cache
	docker compose -p events-based-store up
