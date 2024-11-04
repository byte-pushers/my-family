FROM openjdk:22-jdk-slim AS builder
WORKDIR /builder

COPY target/my-family-ws.jar my-family-ws.jar

RUN java -Djarmode=tools -jar my-family-ws.jar extract --layers --launcher --destination extracted; ls; cd extracted; ls; pwd

FROM openjdk:22-jdk-slim

WORKDIR /application
COPY --from=builder /builder/extracted/dependencies/ ./
COPY --from=builder /builder/extracted/spring-boot-loader/ ./
COPY --from=builder /builder/extracted/snapshot-dependencies/ ./
COPY --from=builder /builder/extracted/application/ ./
COPY --from=builder /builder/my-family-ws.jar ./

ENTRYPOINT ["java", "-jar", "my-family-ws.jar"]