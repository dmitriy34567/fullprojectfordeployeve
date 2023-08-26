export const sendPostRequestForJoin = async (authorId, reciverId, eventId, description, name, eventTittle, contactDetails) => {
    try {
      const token = localStorage.getItem('token');
  
      const requestBody = {
        authorId: authorId,
        reciverId: reciverId,
        eventId: eventId,
        description: description,
        name: name,
        eventTittle : eventTittle,
        contactDetails:contactDetails
      };
  
      const response = await fetch('http://localhost:5000/api/reqevent/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error sending request:', error);
      throw error;
    }
  };