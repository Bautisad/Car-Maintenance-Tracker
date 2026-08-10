FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

COPY . .

RUN chmod +x mvnw && \
    ./mvnw clean package -DskipTests && \
    JAR_FILE=$(find target -maxdepth 1 -name "*.jar" ! -name "*.original" | head -n 1) && \
    cp "$JAR_FILE" target/app.jar

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/app.jar app.jar

EXPOSE 10000

ENTRYPOINT ["java", "-jar", "app.jar"]