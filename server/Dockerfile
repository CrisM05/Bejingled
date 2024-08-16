FROM openjdk:17-jdk-slim
ARG DB_URL
ARG DB_USER
ARG DB_PASS
ENV DB_URL=${DB_URL}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
COPY . .
RUN ./mvnw clean package -DskipTests
EXPOSE 3000
ENTRYPOINT [ "java", "-jar" , "/target/bejingled-0.0.1-SNAPSHOT.jar"]