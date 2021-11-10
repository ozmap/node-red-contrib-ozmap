THIS_FILE := $(lastword $(MAKEFILE_LIST))

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# DOCKER TASKS
build: ## Builds the image for a given service, eg. make build nodered.
	docker-compose -f docker-compose.yml build $(c)

up: ## Execute the container in detached mode for a given service, eg. make up nodered.
	docker-compose -f docker-compose.yml up -d $(c)

start: ## Starts existing containers for a service, eg. make start nodered.
	docker-compose -f docker-compose.yml start $(c)

down: ## Stops containers and removes containers, networks, volumes, and images created by up, for a given service.
	docker-compose -f docker-compose.yml down $(c)

destroy: ## Performs the actions done by the 'down' command, also removing named volumes declared in the 'volumes' section.
	docker-compose -f docker-compose.yml down -v $(c)

stop: ## Stops running containers without removing them. They can be started again with 'make start'.
	docker-compose -f docker-compose.yml stop $(c)

restart: ## Restarts the container, taking into consideration eventual changes in the .yml file.
	docker-compose -f docker-compose.yml stop $(c)
	docker-compose -f docker-compose.yml up -d $(c)

logs: ## Displays log output for a given service.
	docker-compose -f docker-compose.yml logs --tail=100 -f $(c)

ps: ## Lists containers.
	docker-compose -f docker-compose.yml ps
