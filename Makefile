DOCKER_IMAGE = "pdflatex"
DOCKER_INSTANCE = "pdflatex_instance"

.PHONY: build start

all:
	@echo "Usage: make [build|run]"

build:
	PORT=8080 docker build -t $(DOCKER_IMAGE) .

start:
	docker run -d -p 8080:8080 --name $(DOCKER_INSTANCE) $(DOCKER_IMAGE)

stop:
	docker stop $(DOCKER_INSTANCE)
	docker rm $(DOCKER_INSTANCE)

clean:
	docker rmi $(DOCKER_IMAGE)