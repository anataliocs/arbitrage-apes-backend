# Check if we need to prepend docker commands with sudo
SUDO := $(shell docker version >/dev/null 2>&1 || echo "sudo")

# If LABEL is not provided set default value
LABEL ?= $(shell git rev-parse --short HEAD)$(and $(shell git status -s),-dirty-$(shell id -u -n))
# If TAG is not provided set default value
TAG ?= stellar/arbitrage-apes-backend:$(LABEL)
# https://github.com/opencontainers/image-spec/blob/master/annotations.md
BUILD_DATE := $(shell date --utc --rfc-3339=seconds)

docker-build:
	$(SUDO) docker build --label org.opencontainers.image.created="$(BUILD_DATE)" -t $(TAG) .

docker-push:
	$(SUDO) docker push $(TAG)
