# My-family
My Family Reunion App is a role based mobile-web application that will promote family reunions and connect families across the globe.

## My-Family-WS located at `server/my-family-ws` directory
- first run this if you are not already there  cd server/my-family-ws
- to build the docker image run the following command: `mvn clean install -P dev -DskipTests docker:build`
- to start the application inside Docker container, run: `docker-compose up` or try `docker compose up`
- to stop the application running inside Docker container, run: `docker-compose down`
- start Spring Boot in development mode without running any tests `mvn clean install -DskipTests spring-boot:run`
## Windows Setup for Docker
  - If Docker is not installed on your Windows machine, follow this guide to install Docker Desktop:
- https://docs.docker.com/desktop/setup/install/windows-install/
## Mac Setup for Docker
If Docker is not installed on your Mac machine, follow this guide to install Docker Desktop:
- https://docs.docker.com/desktop/setup/install/mac-install/
## IDE Setup for IntelliJ

### Run and debug a Spring Boot application using Docker Compose
- https://www.jetbrains.com/help/idea/run-and-debug-a-spring-boot-application-using-docker-compose.html
### Docker Plugin
- https://www.jetbrains.com/help/idea/docker.html#olg6kf_13

## To run the front end
- First be in the client/my-family-app to go there `cd client/my-family-app`
- Then run `ng server` or `ionic server`