# my-family
My Family Reunion App is a role based mobile-web application that will promote family reunions and connect families across the globe.

## My-Family-WS located at `server/my-family-ws` directory
- to build the docker image run the following command: `mvn clean install -P dev -DskipTests docker:build`
- to start the application inside Docker container, run: `docker-compose up`
- to stop the application running inside Docker container, run: `docker-compose down`
- start Spring Boot in development mode without running any tests `mvn clean install -DskipTests spring-boot:run`


## IDE Setup for IntelliJ
### Run and debug a Spring Boot application using Docker Compose
- https://www.jetbrains.com/help/idea/run-and-debug-a-spring-boot-application-using-docker-compose.html
### Docker Plugin
- https://www.jetbrains.com/help/idea/docker.html#olg6kf_13

