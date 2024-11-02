#FROM amazoncorretto:22 as builder
#WORKDIR /builder
#
#RUN echo "hello there... About to copy jar"
#RUN dir -s
#ADD maven/kitchen-aide-ws.jar ./
#RUN java -Djarmode=tools -jar kitchen-aide-ws.jar extract --layers --destination extracted
#
#FROM amazoncorretto:22
#RUN echo "hello there... About to copy extracted resources"
#WORKDIR /application
#COPY --from=builder /builder/extracted/dependencies/ ./
#COPY --from=builder /builder/extracted/spring-boot-loader/ ./
#COPY --from=builder /builder/extracted/snapshot-dependencies/ ./
#COPY --from=builder /builder/extracted/application/ ./
##ENTRYPOINT ["java", "-jar", "kitchen-aide-ws.jar"]
#ENTRYPOINT exec java $JAVA_OPTS -jar kitchen-aide-ws.jar