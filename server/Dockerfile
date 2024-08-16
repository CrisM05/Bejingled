FROM maven:3.8.5-openjdk-17 as build
COPY . .
RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-alpine
ARG DB_URL
ARG DB_USER
ARG DB_PASS
ENV DB_URL=${DB_URL}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
COPY --from=build /target/bejingled-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 3000
ENTRYPOINT [ "java", "-jar" , "app.jar"]