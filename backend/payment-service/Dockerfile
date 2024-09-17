# Use the base image with Maven and JDK
FROM maven:3.8.3-openjdk-17

# Set the working directory
WORKDIR /app

# Copy the pom.xml and the source files
COPY pom.xml .
COPY src ./src

# Run Maven build to create the JAR file
RUN mvn clean package

# Expose the application port
EXPOSE 9001

# Run the application
CMD ["java", "-jar", "/app/target/payment-service-0.0.1-SNAPSHOT.jar"]
