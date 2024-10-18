FROM openjdk:22-slim

WORKDIR /app



COPY target/my-family-ws-0.0.1-SNAPSHOT.war my-family-ws.war

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "my-family-ws.war"]