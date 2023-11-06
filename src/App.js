import "./App.css";
import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  CardActionArea,
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
  const [deleteList, setDeleteList] = useState([]);

  useEffect(() => {
    //Print data each time the checkbox is "checked" or "unchecked"
    setItems(items);
  }, [deleteList, items]);

  const onChange = (sourceId, sourceIndex, targetIndex) => {
    const nextState = swap(items, sourceIndex, targetIndex);
    console.log("Nextstate Items List->", nextState);
    setItems(nextState);
  };

  // with add & remove filter
  const CheckHandler = (e) => {
    const value = e.target.value;
    setDeleteList((prev) =>
      deleteList.includes(value)
        ? prev.filter((cur) => cur !== value)
        : [...prev, e.target.value]
    );
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("Deleted Items List -> ", deleteList);
    for (var i = 0; i < deleteList.length; i++) {
      const objWithIdIndex = items.findIndex(
        (item) => item.id === deleteList[i]
      );

      if (objWithIdIndex > -1) {
        items.splice(objWithIdIndex, 1);
      }
    }
    console.log("Remaining Items List -> ", items);
    setItems([...items]);
  };

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
            rowHeight={400}
            style={{ height: 280 * Math.ceil(items.length / 4) }}
          >
            {items.map((item, index) => {
              if (index === 0)
                return (
                  <GridItem key={item.id}>
                    <Card
                      variant="outlined"
                      className="mb-8"
                      lg={{
                        marginRight: 2,
                        marginBottom: 2,
                        cursor: "-webkit-grab",
                      }}
                    >
                      <CardActionArea>
                        <input
                          type="checkbox"
                          id={item.id}
                          value={item.id}
                          onClick={CheckHandler}
                        />
                        <CardMedia
                          component="img"
                          height="320"
                          width="200%"
                          image={item.image}
                          alt="green iguana"
                        />
                        <CardContent></CardContent>
                      </CardActionArea>
                    </Card>
                  </GridItem>
                );
              else
                return (
                  <GridItem key={item.id}>
                    {index}
                    <Card
                      variant="outlined"
                      sx={{
                        marginRight: 2,
                        marginBottom: 2,
                        cursor: "-webkit-grab",
                      }}
                    >
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
                );
            })}
          </GridDropZone>
        </GridContextProvider>
      </Box>
    </div>
  );
}
