BASEDIR=$(CURDIR)

DOCKER_IMAGE_NAME=my-family
SHA := $(shell git rev-parse --short HEAD)

dockerbuild:
	docker build -t $(DOCKER_IMAGE_NAME) client/my-family-app

dockerpush: dockerbuild
	echo "$(DOCKER_USER_TOKEN)" | docker login -u "$(DOCKER_USERNAME)" --password-stdin
	docker image tag $(DOCKER_IMAGE_NAME) tontepouncil/$(DOCKER_IMAGE_NAME):latest
	docker image tag $(DOCKER_IMAGE_NAME) tontepouncil/$(DOCKER_IMAGE_NAME):$(SHA)
	docker image push tontepouncil/$(DOCKER_IMAGE_NAME):latest
	docker image push tontepouncil/$(DOCKER_IMAGE_NAME):$(SHA)