FROM openjdk:22-jdk-slim AS builder
WORKDIR /builder

COPY target/my-family-ws.jar my-family-ws.jar

RUN echo "hello there... About to copy jar"
RUN java -Djarmode=tools -jar my-family-ws.jar extract --layers --launcher --destination extracted; ls; cd extracted; ls; pwd

RUN echo "start list files in builder/extracted/dependencies/BOOT-INF/lib dir"
RUN ls /builder/extracted/dependencies/BOOT-INF/lib
RUN echo "end list files in builder/extracted/dependencies/BOOT-INF/lib dir"

RUN echo "start list files in builder/extracted/dependencies dir"
RUN ls /builder/extracted/dependencies
RUN echo "end list files in builder/extracted/dependencies dir"

RUN echo "start list files in builder/extracted/snapshot-dependencies dir"
RUN ls /builder/extracted/snapshot-dependencies
RUN echo "end list files in builder/extracted/snapshot-dependencies dir"

RUN echo "start list files in builder/extracted/application dir"
RUN ls /builder/extracted/application
RUN echo "end list files in builder/extracted/application dir"

FROM openjdk:22-jdk-slim
RUN echo "hello there... About to copy extracted resources"
WORKDIR /application
COPY --from=builder /builder/extracted/dependencies/ ./
COPY --from=builder /builder/extracted/spring-boot-loader/ ./
COPY --from=builder /builder/extracted/snapshot-dependencies/ ./
COPY --from=builder /builder/extracted/application/ ./
COPY --from=builder /builder/my-family-ws.jar ./

ENTRYPOINT ["java", "-jar", "my-family-ws.jar"]
#ENTRYPOINT exec java $JAVA_OPTS -jar my-family-ws.jar