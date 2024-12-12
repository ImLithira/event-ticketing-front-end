# Event Ticketing System - Setup, Usage, and Troubleshooting

# Introduction

This guide provides detailed instructions on how to set up, use, and
troubleshoot the Ticketing System application. Additionally, common
issues and their solutions are outlined to assist in resolving any
potential challenges that may arise during usage.

# Assumptions

The following are based as assumptions:

-   The user has cloned the two projects (frontend and backend) from
    GitHub.

-   The user has the appropriate IDEs to run the code:

    -   IntelliJ IDEA for the backend (Spring Boot)

    -   Visual Studio Code for the frontend (Angular)

-   The user has opened the backend project in IntelliJ IDEA and the
    frontend project in Visual Studio Code.

3.  # Setup

    1.  ### Backend Project Setup

```{=html}
<!-- -->
```
1.  Ensure that you have **Java 19 or higher** and **Maven** installed
    on your machine.

2.  IntelliJ should automatically detect dependencies and download them.
    If not, you can manually install dependencies using the terminal by
    running: *mvn clean install*

3.  Once the project is loaded, navigate to the
    TicketingSystemBEApplication.java (main class).
    <img src='src/images/Screenshot 2024-12-12 000934.png'>

4.  Click on the green play button or use Ctrl+Shift+F10 (Windows/Linux)
    or Cmd+Shift+F10 (Mac) to run the backend server.

5.  The backend server should now be running locally on
    *<http://localhost:8080>*.
    <img src='src/images/Screenshot 2024-12-12 001040.png'>

    1.  ### Frontend Project Setup

```{=html}
<!-- -->
```
1.  Open the terminal in Visual Studio Code (Ctrl+\` ) and navigate to
    the frontend project directory.

2.  Run the following command to install the required npm packages: *npm
    install*

3.  In the terminal, execute the following command to start the frontend
    server: *ng serve*

4.  The frontend should now be running at *<http://localhost:4200>.
    *
    <img src='src/images/Screenshot 2024-12-12 001347.png'>


```{=html}
<!-- -->
```
4.  # User Flow

    1.  ### Landing Page

-   Once the frontend is opened in the browser, the user would be
    greeted with a welcome text and 3 options:

    -   Admin -- Upon clicking, navigates the user to the Admin page

    -   Vendor -- Upon clicking, navigates the user to the Vendor page

    -   Customer -- Upon clicking, navigates the user to the Customer
        page

<img src='![alt text](<src/images/Screenshot 2024-12-12 001846.png>)'

### Admin Page

-   The Admin page has the following contents:

    -   Back option -- upon clicking, navigates the user back to the
        landing page.

    -   Configuration Tab

    -   Released Tickets Tab

    -   Purchased Tickets Tab

    -   Event Logs Tab

-   Configuration Tab:

    -   This tab allows the admin to view the configurations submitted
        and also submit/update the configurations.

    -   The configurations include:

        -   Total Tickets: Defines the total number of tickets that can
            be released in the system.

        -   Max Ticket Pool Capacity: Defines the maximum number of
            tickets that can be available for release and purchase at
            any given time.

        -   Release Rate: Defines how frequently tickets are released by
            vendors (in seconds).

        -   Retrieval Rate: Defines how frequently tickets are purchased
            by customers (in seconds).

    -   Upon successful submission, the user should be able to see a
        success message.\
        <img src='src/images/Screenshot 2024-12-12 002722.png'>

    -   If the user enters invalid data, the user should be able to see
        the error messages.\
        <img src='src/images/Screenshot 2024-12-12 002829.png'>

    -   Upon clicking on the start button, the user starts the system
        and a log will be saved with the timestamp.

    -   Only after starting the system, the stop and add vendor buttons
        get enabled.

    -   For each button action, a log is created.

    -   Upon clicking on the add vendor button, a vendor will be added
        to the system and based on the configurations, the vendor will
        start releasing tickets.

    -   All released tickets will be logged.

    -   Only after adding a vendor, the user can add a customer, until
        that, the customer button remains disabled.

    -   Upon clicking on the add customer button, a customer will be
        added to the system and based on the configurations, the
        customer will start purchasing the released and available
        tickets.

    -   All purchased tickets will be logged.

    -   The user/admin is able to add multiple vendors and customers.

    -   Upon clicking on the stop button, the user stops the system and
        a log will be saved with the timestamp.

        -   Additionally, this stops the vendor's releasing and
            customer's purchasing tickets.

-   Released Tickets Tab:

    -   This tab allows the admin to view the released tickets by
        vendors.

    -   The user/admin has to simply click on the refresh button to view
        all released tickets by all vendors to the system.\
        <img src='src/images/Screenshot 2024-12-12 003600.png'>

    -   Additionally, the admin can filter by searching based on the
        following:

        -   Ticket ID

        -   Ticket Name

        -   Ticket Type

        -   Vendor Name

    -   Upon clicking on the clear button, clears the filtration.

-   Purchased Tickets Tab:

    -   This tab allows the admin to view the purchased tickets by
        customers.

    -   The user/admin has to simply click on the refresh button to view
        all purchased tickets by all customers to the system.\
        <img src='src/images/Screenshot 2024-12-12 003908.png'>

    -   Additionally, the admin can filter by searching based on the
        following:

        -   Ticket ID

        -   Ticket Name

        -   Ticket Type

        -   Vendor Name

        -   Customer Name

    -   Upon clicking on the clear button, clears the filtration.

-   Event Logs Tab:

    -   This tab allows the admin to view all the logs.

    -   The user/admin has to simply click on the refresh button to view
        all logs in the system.\
        <img src='src/images/Screenshot 2024-12-12 004041.png'>

    -   Additionally, the admin can filter by searching based on the
        following:

        -   Event Type

        -   Message

    -   Upon clicking on the clear button, clears the filtration.

    1.  ### Vendor Page

-   The Vendor page has the following contents:

    -   Back option -- upon clicking, navigates the user back to the
        landing page.

    -   Configuration Tab

    -   Released Tickets Tab

    -   Purchased Tickets Tab

-   Configuration Tab:

    -   This tab allows the vendor's to view the configurations
        submitted by the admin.

    -   The configurations include:

        -   Total Tickets: Defines the total number of tickets that can
            be released in the system.

        -   Max Ticket Pool Capacity: Defines the maximum number of
            tickets that can be available for release and purchase at
            any given time.

        -   Release Rate: Defines how frequently tickets are released by
            vendors (in seconds).\
            <img src='src/images/Screenshot 2024-12-12 004049.png'>

    -   The add vendor button simply adds a vendor to the system.

-   Released Tickets Tab:

    -   This tab allows the vendors to view their released tickets.

    -   The user/vendor has to simply click on the refresh button to
        view all released tickets to the system.\
        <img src='src/images/Screenshot 2024-12-12 004328.png'>

    -   Additionally, the vendor can filter by searching based on the
        following:

        -   Ticket ID

        -   Ticket Name

        -   Ticket Type

        -   Vendor Name

    -   Upon clicking on the clear button, clears the filtration.

-   Purchased Tickets Tab:

    -   This tab allows the vendors to view the purchased tickets by
        customers.

    -   The user/vendor has to simply click on the refresh button to
        view all purchased tickets by all customers in the system.\
        <img src='src/images/Screenshot 2024-12-12 004543.png'>

    -   Additionally, the vendor can filter by searching based on the
        following:

        -   Ticket ID

        -   Ticket Name

        -   Ticket Type

        -   Vendor Name

        -   Customer Name

    -   Upon clicking on the clear button, clears the filtration.

    1.  ### Customer Page

-   The Customer page has the following contents:

    -   Back option -- upon clicking, navigates the user back to the
        landing page.

    -   Configuration Tab

    -   Available Tickets Tab

    -   Purchased Tickets Tab

-   Configuration Tab:

    -   This tab allows the customer's to view the configurations
        submitted by the admin.

    -   The configurations include:

        -   Total Tickets: Defines the total number of tickets that can
            be released in the system.

        -   Max Ticket Pool Capacity: Defines the maximum number of
            tickets that can be available for release and purchase at
            any given time.

        -   Retrieval Rate: Defines how frequently tickets are purchased
            by customers (in seconds).\
            <img src='src/images/Screenshot 2024-12-12 004637.png'>

    -   The add customer button simply adds a customer to the system.

-   Available Tickets Tab:

    -   This tab allows the customer's to view all available tickets.

    -   The user/customer has to simply click on the refresh button to
        view all available tickets in the system.\
        <img src='src/images/Screenshot 2024-12-12 004819.png'>

    -   If there aren't any available tickets, the table would display a
        "No Results" message.

    -   Additionally, the customer can filter by searching based on the
        following:

        -   Ticket ID

        -   Ticket Name

        -   Ticket Type

        -   Vendor Name

    -   Upon clicking on the clear button, clears the filtration.

-   Purchased Tickets Tab:

    -   This tab allows the customer to view their purchased tickets.

    -   The user/customer has to simply click on the refresh button to
        view all purchased tickets in the system.\
        <img src='src/images/Screenshot 2024-12-12 004956.png'>

    -   Additionally, the customer can filter by searching based on the
        following:

        -   Ticket ID

        -   Ticket Name

        -   Ticket Type

        -   Vendor Name

        -   Customer Name

    -   Upon clicking on the clear button, clears the filtration.

# TroubleShooting

Below are some common issues you may encounter during setup or usage,
along with their solutions:

-   Backend Server Fails to Start:

    -   Ensure that all required dependencies are downloaded in
        IntelliJ.

    -   Double-check the application.properties file for correctness.

-   Frontend Application Does Not Load:

    -   Ensure Node.js and Angular CLI are installed.

    -   Navigate to the frontend project folder in the terminal and run
        npm install to install dependencies.

    -   Start the Angular development server using ng serve.

-   Configuration Not Saved:

    -   Ensure the backend server is running before attempting to save
        configurations.

    -   Verify that the config file is not locked or corrupted.

    -   Check the server logs for any errors during the save operation.

-   Unable to Add Vendors or Customers:

    -   Make sure the system is started by clicking the \"Start\" button
        after entering configurations.

    -   Validate the input fields for the vendor/customer details.

-   Logs Not Displaying:

    -   Check the backend server logs to ensure log generation is
        functioning.

    -   Verify that the logs file is present and accessible.

Please refer the demo video for further information:

[Demo
Video](https://drive.google.com/file/d/133SdPpf5PaCpHitxD3SZppsteIrvUJNP/view?usp=sharing)
