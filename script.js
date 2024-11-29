const fruits = [
    { name: 'apple', image: 'images/apple.png', points: 10, next: 'orange' },
    { name: 'orange', image: 'images/orange.png', points: 15, next: 'banana' },
    { name: 'banana', image: 'images/banana.png', points: 20, next: 'watermelon' },
    { name: 'watermelon', image: 'images/watermelon.png', points: 50, next: null }
  ];
  
  let score = 0;
  const box = document.getElementById('box');
  let boxFruit = null; // Holds the fruit currently in the box
  
  // Function to spawn a fruit
  function spawnFruit() {
    const fruitIndex = Math.floor(Math.random() * 3); // Randomly pick a fruit except watermelon
    const fruit = fruits[fruitIndex];
  
    const fruitElement = document.createElement('img');
    fruitElement.src = fruit.image;
    fruitElement.className = 'fruit';
    fruitElement.draggable = true;
    fruitElement.dataset.name = fruit.name;
  
    // Random position for spawning fruits
    fruitElement.style.top = `${Math.random() * 80}vh`;
    fruitElement.style.left = `${Math.random() * 100}vw`;
  
    // Drag events
    fruitElement.ondragstart = (event) => {
      event.dataTransfer.setData('text/plain', fruit.name);
    };
  
    document.getElementById('game-area').appendChild(fruitElement);
  
    // Remove fruit after 5 seconds if not used
    setTimeout(() => {
      if (document.body.contains(fruitElement)) {
        fruitElement.remove();
      }
    }, 5000);
  }
  
  // Function to handle dropping fruit in the box
  box.ondragover = (event) => {
    event.preventDefault(); // Allows drop
  };
  
  box.ondrop = (event) => {
    event.preventDefault();
  
    const fruitName = event.dataTransfer.getData('text/plain');
    const fruit = fruits.find(f => f.name === fruitName);
  
    // Check if box already contains a fruit
    if (boxFruit && boxFruit.name === fruit.name) {
      // Merge fruits
      const newFruit = fruits.find(f => f.name === boxFruit.next);
  
      if (newFruit) {
        boxFruit = newFruit; // Update box fruit to the next level fruit
        score += newFruit.points;
        document.getElementById('score').innerText = `Score: ${score}`;
  
        // Update box image to new fruit
        box.style.backgroundImage = `url(${newFruit.image})`;
      } else {
        boxFruit = null; // Clear box if no further fruit exists
        box.style.backgroundImage = 'none';
      }
    } else {
      // Place the fruit in the box if empty or if it's different
      boxFruit = fruit;
      box.style.backgroundImage = `url(${fruit.image})`;
    }
  };
  
  // Call spawnFruit function at an interval
  setInterval(spawnFruit, 1500); // Adjust interval as needed
  