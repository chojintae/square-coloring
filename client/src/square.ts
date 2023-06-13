import { List } from './list';

export type Color = "white" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";

export type Square =
    | {readonly kind: "solid", readonly color: Color}
    | {readonly kind: "split", readonly nw: Square, readonly ne: Square,
       readonly sw: Square, readonly se: Square};

export function solid(color: Color): Square {
  return {kind: "solid", color: color};
}

export function split(nw: Square, ne: Square, sw: Square, se: Square): Square {
  return {kind: "split", nw: nw, ne: ne, sw: sw, se: se};
}


/** Returns JSON describing the given Square. */
export function toJson(sq: Square): any {
  if (sq.kind === "solid") {
    return sq.color;
  } else {
    return [toJson(sq.nw), toJson(sq.ne), toJson(sq.sw), toJson(sq.se)];
  }
}

/** Converts a JSON description to the Square it describes. */
export function fromJson(data: any): Square {
  if (typeof data === 'string') {
    switch (data) {
      case "white": case "red": case "orange": case "yellow":
      case "green": case "blue": case "purple":
        return solid(data);

      default:
        throw new Error(`unknown color "${data}"`);
    }
  } else if (Array.isArray(data)) {
    if (data.length === 4) {
      return split(fromJson(data[0]), fromJson(data[1]),
                   fromJson(data[2]), fromJson(data[3]));
    } else {
      throw new Error('split must have 4 parts');
    }
  } else {
    throw new Error(`type ${typeof data} is not a valid square`);
  }
}


/** Indicates one of the four parts of a split. */
export type Dir = "NW" | "NE" | "SE" | "SW";

/** Describes how to get to a square from the root of the tree. */
export type Path = List<Dir>;

export function retrieve_the_root(path: Path, tree: Square): Square {
  if (path === "nil") {
    return tree
  } else if (tree.kind === "solid") {
    throw new Error("path is longer than tree!")
  } else {
    switch (path.hd) {
      case "NW": return retrieve_the_root(path.tl, tree.nw)
      case "NE": return retrieve_the_root(path.tl, tree.ne)
      case "SE": return retrieve_the_root(path.tl, tree.se)
      case "SW": return retrieve_the_root(path.tl, tree.sw)
    }
  }
}



export function return_a_new_square(square1: Square, path: Path, square2: Square): Square {
  if (path === "nil") {
    return square2
  } else if (square1.kind === "solid") {
    throw new Error("path is longer than tree!")
  } else {
    if (path.hd === "NW") {
      return split(return_a_new_square(square1.nw, path.tl, square2), square1.ne, square1.sw, square1.se)
    } else if (path.hd === "NE") {
      return split(square1.nw, return_a_new_square(square1.ne, path.tl, square2), square1.sw, square1.se)
    } else if (path.hd === "SW") {
      return split(square1.nw, square1.ne, return_a_new_square(square1.sw, path.tl, square2), square1.se)
    } else {
      return split(square1.nw, square1.ne, square1.sw, return_a_new_square(square1.se, path.tl, square2))
    }
  }
}