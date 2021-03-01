document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  const devourBtns = document.querySelectorAll(".devour");

  if (devourBtns) {
    devourBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        //console.log("test");
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        console.log(id);
        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            devoured: true,
          }),

          // make sure to serialize the JSON body
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          //console.log(response, response.body);
          if (response.ok) {
            console.log(`Devoured Burger: ${id}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }

  const createBurgerBtn = document.getElementById("create-form");

  if (createBurgerBtn) {
    createBurgerBtn.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("submit");
      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        name: document.getElementById("burgerName").value.trim(),
      };
      console.log(newBurger);
      // Send POST request to create a new quote
      fetch("/api/burgers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById("burgerName").value = "";

        // Reload the page so the user can see the new quote
        console.log("Created a new burger!");
        location.reload();
      });
    });
  }
});
