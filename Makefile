BASEDIR=$(CURDIR)

#DOCKER_IMAGE_NAME=my-family
#DOCKER_IMAGE_SRC_DIR=client/my-family-app
SHA := $(shell git rev-parse --short HEAD)

dockerbuild:
	echo "running docker build for $(DOCKER_IMAGE_NAME) image."
	docker build -t $(DOCKER_IMAGE_NAME) $(DOCKER_IMAGE_SRC_DIR)

dockerpush: dockerbuild
	echo "running docker push build for $(DOCKER_IMAGE_NAME) image."
	echo "$(DOCKER_USER_TOKEN)" | docker login -u "$(DOCKER_USERNAME)" --password-stdin
	docker image tag $(DOCKER_IMAGE_NAME) tontepouncil/$(DOCKER_IMAGE_NAME):latest
	docker image tag $(DOCKER_IMAGE_NAME) tontepouncil/$(DOCKER_IMAGE_NAME):$(SHA)
	docker image push tontepouncil/$(DOCKER_IMAGE_NAME):latest
	docker image push tontepouncil/$(DOCKER_IMAGE_NAME):$(SHA)