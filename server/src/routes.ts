import { Request, Response } from "express";

const files_name = new Map<string, string>(); 

export function save(req: Request, res: Response) { 
  const name = req.body.name;
  const contents = req.body.contents;

  if (name === undefined || typeof name !== 'string') {
    res.status(400).send('missing "name" parameter');
    return;
  } else if (contents === undefined || typeof contents !== 'string') {
    res.status(402).send('missing "file" parameter');
    return;
  }

  if(!files_name.has(contents)) {
    
    files_name.set(name, contents);
    res.status(200).send('File saved successfully')
  } else if (files_name.has(contents)) {
    files_name.set(name, contents);
    res.status(200).send("file written")
  } else {
    res.status(400).send("failed to save file")
  }
}


export function load(req: Request, res: Response) {
  const name = req.query.name
  if (name === undefined || typeof name !== 'string') {
    res.status(400).send("missing 'name' parameter");
    return;
  } else {
    res.status(200).json(files_name.get(name))
  }
}

export function list_names(_: Request, res: Response) {
  res.json(Array.from(files_name.keys()))
}

export function reset() {
  files_name.clear()
}

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
// function first(param: any): string|undefined {
//   if (Array.isArray(param)) {
//     return first(param[0]);
//   } else if (typeof param === 'string') {
//     return param;
//   } else {
//     return undefined;
//   }
// }