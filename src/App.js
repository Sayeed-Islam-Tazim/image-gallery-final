import "./App.css";
import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Checkbox,
} from "@mui/material";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

const images = [
  {
    id: "1",
    image: "images/image-1.webp",
    checked: false,
  },
  {
    id: "2",
    image: "images/image-2.webp",
    checked: false,
  },
  {
    id: "3",
    image: "images/image-3.webp",
    checked: false,
  },
  {
    id: "4",
    image: "images/image-4.webp",
    checked: false,
  },
  {
    id: "5",
    image: "images/image-5.webp",
    checked: false,
  },
  {
    id: "6",
    image: "images/image-6.webp",
    checked: false,
  },
  {
    id: "7",
    image: "images/image-7.webp",
    checked: false,
  },
  {
    id: "8",
    image: "images/image-8.webp",
    checked: false,
  },
  {
    id: "9",
    image: "images/image-9.webp",
    checked: false,
  },
  {
    id: "10",
    image: "images/image-10.jpeg",
    checked: false,
  },
  {
    id: "11",
    image: "images/image-11.jpeg",
    checked: false,
  },
];

export default function App() {
  const [items, setItems] = useState(images);

  function onChange(sourceId, sourceIndex, targetIndex) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }

  // const deleteList = [];

  const [deleteList, setDeleteList] = useState([]);

  // const CheckHandler = (e) => {
  //   setPerson((prev) => [...prev, e.target.value]);
  // };

  // with add & remove filter
  const CheckHandler = (e) => {
    const value = e.target.value;
    setDeleteList((prev) =>
      deleteList.includes(value)
        ? prev.filter((cur) => cur !== value)
        : [...prev, e.target.value]
    );
  };

  useEffect(() => {
    //Print data each time the checkbox is "checked" or "unchecked"
    console.log(deleteList);
  }, [deleteList]);

  useEffect(() => {
    //Print data each time the checkbox is "checked" or "unchecked"
    console.log(items);
  }, [items]);

  function handleDelete(event) {
    event.preventDefault();
    console.log("delete button pressed");
    console.log(deleteList);

    for (var i = 0; i < deleteList.length; i++) {
      const objWithIdIndex = items.findIndex(
        (item) => item.id === deleteList[i]
      );

      if (objWithIdIndex > -1) {
        items.splice(objWithIdIndex, 1);
      }
    }
    console.log(items);
  }

  return (
    <div className="container containerDesign">
      <nav className="navbar navbar-light mt-3">
        <h2 className="navbar-brand">Gallery</h2>
        <p>{deleteList.length} items selected</p>
        <form className="form-inline">
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            onClick={handleDelete}
          >
            Delete
          </button>
        </form>
      </nav>
      <hr />
      <Box className="App">
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id="items"
            boxesPerRow={4}
            rowHeight={280}
            style={{ height: 280 * Math.ceil(items.length / 4) }}
          >
            {items.map((item, index) => (
              <GridItem key={item.id}>
                {index}
                <Card
                  sx={{
                    marginRight: 2,
                    marginBottom: 2,
                    cursor: "-webkit-grab",
                  }}
                >
                  {/* <Checkbox
                    className="hoverring-check"
                    checked={item.checked}
                    onChange={handleChange.bind(this)}
                    inputProps={{ "aria-label": "controlled" }}
                  /> */}
                  <input
                    type="checkbox"
                    id={item.id}
                    value={item.id}
                    onClick={CheckHandler}
                  />
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt="green iguana"
                  />
                  <CardContent></CardContent>
                </Card>
              </GridItem>
            ))}
          </GridDropZone>
        </GridContextProvider>

        {/* <button type="button" onClick={() => console.log("state", items)}>
          State
        </button> */}
      </Box>
    </div>
  );
}

// export default App;
