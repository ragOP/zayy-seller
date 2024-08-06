export const createShiprocketOrder = async (orderData) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ5OTg3MjksInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzIzNzk4MDc3LCJqdGkiOiJhYXdTY3BSaWRLQTVqRVp2IiwiaWF0IjoxNzIyOTM0MDc3LCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyMjkzNDA3NywiY2lkIjo0MDQwMDg3LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6InNob3BpZnkifQ.33TrrMalYNDu_MLBurEnI6NVM7p9UIg8hdWdYVqf4MM'; 
  
    const apiUrl = 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc ';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create Shiprocket order');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating Shiprocket order:', error);
      throw error;
    }
  };
  