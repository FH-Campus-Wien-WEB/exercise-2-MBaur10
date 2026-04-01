window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        /* Task 1.3. Add your code from exercise 1 here 
           and include a non-functional 'Edit' button
           to pass this test */
        const movieElement = document.createElement("article")
        movieElement.id = movie.imdbID;
        movieElement.classList.add("movie-card");

        //Poster
        const img = document.createElement("img");
        img.src = movie.Poster;

        //Title
        const h2 = document.createElement("h2");
        h2.textContent = movie.Title;
        movieElement.append(h2);

        //Meta Info
        const dl = document.createElement("dl");

        //Ratings
        const ratingsDiv = document.createElement("div");
        ratingsDiv.classList.add("ratings")

        const ratingsP = document.createElement("p");
        ratingsP.textContent =
          `Metascore: ${movie.Metascore} | IMDb: ${movie.imdbRating}`;
        ratingsDiv.append(ratingsP);
        dl.append(ratingsDiv);

        //Release Date
        const releasedDt = document.createElement("dt");
        releasedDt.textContent = "Released: ";
        const releasedDd = document.createElement("dd");
        releasedDd.textContent = movie.Released;
        dl.append(releasedDt, releasedDd);

        //Runtime
        const runtimeDt = document.createElement("dt");
        runtimeDt.textContent = "Runtime: "
        const runtimeDd = document.createElement("dd");
        runtimeDd.textContent = movie.Runtime + " min";
        dl.append(runtimeDt, runtimeDd);

        //Genres
        const genresDt = document.createElement("dt");
        genresDt.textContent = "Genres:";
        const genresDd = document.createElement("dd")
        genresDd.textContent = movie.Genres.join(", ")
        dl.append(genresDt, genresDd);

        //Plot
        const plotP = document.createElement("p");
        plotP.textContent = movie.Plot;
        plotP.classList.add("plot");
        dl.append(plotP);

        //Directors
        const directorsH3 = document.createElement("h3")
        directorsH3.textContent = "Directors:";
        const directorsList = document.createElement("ul");
        movie.Directors.forEach(director => {
          const li = document.createElement("li");
          li.textContent = director;
          directorsList.append(li);
        })
        dl.append(directorsH3, directorsList);

        //Writers
        const writersH3 = document.createElement("h3")
        writersH3.textContent = "Writers:";
        const writersList = document.createElement("ul");
        movie.Writers.forEach(writer => {
          const li = document.createElement("li");
          li.textContent = writer;
          writersList.append(li);
        })
        dl.append(writersH3, writersList);

        //Actors
        const actorsH3 = document.createElement("h3")
        actorsH3.textContent = "Actors:";
        const actorsList = document.createElement("ul");
        movie.Actors.forEach(actor => {
          const li = document.createElement("li");
          li.textContent = actor;
          actorsList.append(li);
        })
        dl.append(actorsH3, actorsList);

        //edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID
        };
        movieElement.append(editButton);
        
        //add to movieElement, append to body
        movieElement.append(img, h2, dl);
        bodyElement.append(movieElement);
      }

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
        xhr.status +
        " - " +
        xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
