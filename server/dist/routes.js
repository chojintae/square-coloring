"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.list_names = exports.load = exports.save = void 0;
var files_name = new Map();
function save(req, res) {
    var name = req.body.name;
    var contents = req.body.contents;
    console.log(contents);
    console.log(files_name);
    if (name === undefined || typeof name !== 'string') {
        res.status(400).send('missing "name" parameter');
        return;
    }
    else if (contents === undefined || typeof contents !== 'string') {
        res.status(402).send('missing "file" parameter');
        return;
    }
    if (!files_name.has(contents)) {
        files_name.set(name, contents);
        res.status(200).send('File saved successfully');
    }
    else if (files_name.has(contents)) {
        files_name.set(name, contents);
        res.status(200).send("file written");
    }
    else {
        res.status(400).send("failed to save file");
    }
}
exports.save = save;
function load(req, res) {
    var name = req.query.name;
    if (name === undefined || typeof name !== 'string') {
        res.status(400).send("missing 'name' parameter");
        return;
    }
    else {
        res.status(200).json(files_name.get(name));
    }
}
exports.load = load;
function list_names(_, res) {
    res.json(Array.from(files_name.keys()));
}
exports.list_names = list_names;
function reset() {
    files_name.clear();
}
exports.reset = reset;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxJQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztBQUU3QyxTQUFnQixJQUFJLENBQUMsR0FBWSxFQUFFLEdBQWE7SUFDOUMsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDM0IsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3ZCLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNqRCxPQUFPO0tBQ1I7U0FBTSxJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ2pFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDakQsT0FBTztLQUNSO0lBRUQsSUFBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFFNUIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQTtLQUNoRDtTQUFNLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNuQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtLQUNyQztTQUFNO1FBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtLQUM1QztBQUNILENBQUM7QUF2QkQsb0JBdUJDO0FBR0QsU0FBZ0IsSUFBSSxDQUFDLEdBQVksRUFBRSxHQUFhO0lBQzlDLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBO0lBQzNCLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNqRCxPQUFPO0tBQ1I7U0FBTTtRQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtLQUMzQztBQUNILENBQUM7QUFSRCxvQkFRQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxDQUFVLEVBQUUsR0FBYTtJQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUN6QyxDQUFDO0FBRkQsZ0NBRUM7QUFFRCxTQUFnQixLQUFLO0lBQ25CLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtBQUNwQixDQUFDO0FBRkQsc0JBRUM7QUFFRCx3RUFBd0U7QUFDeEUsNEVBQTRFO0FBQzVFLG1EQUFtRDtBQUNuRCxpREFBaUQ7QUFDakQsZ0NBQWdDO0FBQ2hDLDhCQUE4QjtBQUM5Qiw0Q0FBNEM7QUFDNUMsb0JBQW9CO0FBQ3BCLGFBQWE7QUFDYix3QkFBd0I7QUFDeEIsTUFBTTtBQUNOLElBQUkifQ==