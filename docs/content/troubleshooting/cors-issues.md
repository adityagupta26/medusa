# CORS issues

If you are experiencing connection issues when trying to access your Medusa instance from a storefront, it is most likely due to CORS issues. 

You might see a log in your browser console, that looks like this:

![CORS error log](https://i.imgur.com/jnHK115.png)

In your `medusa-config.js` , you should ensure that you've configured your CORS settings correctly. By default, the Medusa starter run on port 9000, Medusa Admin on port 7000, and the storefront starters on port 8000. 

The default configuration uses the following CORS settings:

```jsx
// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000"
```

If you wish to run your storefront or Medusa admin on other ports, you should update the above settings accordinly.