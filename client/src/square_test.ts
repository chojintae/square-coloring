import * as assert from 'assert';
import { solid, split, toJson, fromJson, Path, Square, retrieve_the_root, return_a_new_square } from './square';
import { cons, nil } from './list';


describe('square', function() {

  it('retrieve_the_root', function() {
    //0-1-2 heuristics, base case
    const path1:Path = nil
    const tree1:Square = solid("blue")
    const result1:Square = retrieve_the_root(path1, tree1)
    assert.deepEqual(result1, solid("blue"))

    //0-1-2 heuristics, base case
    const path2:Path = nil
    const tree2:Square = solid("green")
    const result2:Square = retrieve_the_root(path2, tree2)
    assert.deepEqual(result2, solid("green"))

    //0-1-2 heuristics, 1st case
    const path3:Path = cons("NW", nil)
    const tree3:Square = split(solid("blue"), solid("orange"), solid("purple"),solid("green"))
    const result3:Square = retrieve_the_root(path3, tree3)
    assert.deepEqual(result3, solid("blue"))

    //0-1-2 heuristics, 1st case
    const path4:Path = cons("NE", nil)
    const tree4:Square = split(solid("blue"), solid("orange"), solid("purple"),solid("green"))
    const result4:Square = retrieve_the_root(path4, tree4)
    assert.deepEqual(result4, solid("orange"))
    
    //0-1-2 heuristics, 2nd case
    const path5:Path = cons("NW", cons("NE", nil))
    const tree5:Square = split(split(solid("orange"), solid("purple"),solid("green"), solid("blue")), solid("orange"), solid("purple"),solid("green"))
    const result5:Square = retrieve_the_root(path5, tree5)
    assert.deepEqual(result5, solid("purple"))

    //0-1-2 heuristics, 2nd case
    const path6:Path = cons("SE", cons("NW", nil))
    const tree6:Square = split(solid("orange"), solid("purple"),solid("green"),split(solid("orange"), solid("purple"),solid("green"), solid("blue")))
    const result6:Square = retrieve_the_root(path6, tree6)
    assert.deepEqual(result6, solid("orange"))

  });

  it('return_a_new_square', function() {
    //0-1-2 heuristics, base case
    const path1:Path = nil
    const firstSquare1:Square = solid("blue")
    const secondSqaure1:Square = solid("green")
    const result1:Square = return_a_new_square(firstSquare1, path1, secondSqaure1)
    assert.deepEqual(result1, solid("green"))

    //0-1-2 heuristics, base case
    const path2:Path = nil
    const firstSquare2:Square = solid("purple")
    const secondSqaure2:Square = solid("orange")
    const result2:Square = return_a_new_square(firstSquare2, path2, secondSqaure2)
    assert.deepEqual(result2, solid("orange"))

    //0-1-2 heuristics, 1st case  
    const path3:Path = cons("NW", nil)
    const firstSquare3:Square = split(solid("blue"), solid("orange"), solid("purple"),solid("green"))
    const secondSqaure3:Square = solid("white")
    const result3:Square = return_a_new_square(firstSquare3, path3, secondSqaure3)
    assert.deepEqual(result3, split(solid("white"), solid("orange"), solid("purple"),solid("green")))

    //0-1-2 heuristics, 1st case
    const path4:Path = cons("NE", nil)
    const firstSquare4:Square = split(solid("blue"), solid("orange"), solid("purple"),solid("green"))
    const secondSqaure4:Square = solid("green")
    const result4:Square = return_a_new_square(firstSquare4, path4, secondSqaure4)
    assert.deepEqual(result4, split(solid("blue"), solid("green"), solid("purple"),solid("green")))

    //0-1-2 heuristics, 2nd case
    const path5:Path = cons("NW", cons("NW", nil))
    const firstSquare5:Square = split(split(solid("orange"), solid("purple"),solid("green"), solid("blue")), solid("orange"), solid("purple"),solid("green"))
    const secondSqaure5:Square = solid("green")
    const result5:Square = return_a_new_square(firstSquare5, path5, secondSqaure5)
    assert.deepEqual(result5, split(split(solid("green"), solid("purple"), solid("green"), solid("blue")), solid("orange"), solid("purple"),solid("green")))

    //0-1-2 heuristics, 2nd case
    const path6:Path = cons("SE", cons("NW", nil))
    const firstSquare6:Square = split(solid("orange"), solid("purple"), solid("green"), split(solid("orange"), solid("purple"),solid("green"), solid("blue")))
    const secondSqaure6:Square = solid("green")
    const result6:Square = return_a_new_square(firstSquare6, path6, secondSqaure6)
    assert.deepEqual(result6, split(solid("orange"), solid("purple"), solid("green"), split(solid("green"), solid("purple"),solid("green"), solid("blue"))))
    
  });


  it('toJson', function() {
    assert.deepEqual(toJson(solid("white")), "white");
    assert.deepEqual(toJson(solid("green")), "green");

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepEqual(toJson(s1),
      ["blue", "orange", "purple", "white"]);

    const s2 = split(s1, solid("green"), s1, solid("red"));
    assert.deepEqual(toJson(s2),
      [["blue", "orange", "purple", "white"], "green",
       ["blue", "orange", "purple", "white"], "red"]);

    const s3 = split(solid("green"), s1, solid("yellow"), s1);
    assert.deepEqual(toJson(s3),
      ["green", ["blue", "orange", "purple", "white"],
       "yellow", ["blue", "orange", "purple", "white"]]);
  });

  it('fromJson', function() {
    assert.deepEqual(fromJson("white"), solid("white"));
    assert.deepEqual(fromJson("green"), solid("green"));

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepEqual(fromJson(["blue", "orange", "purple", "white"]), s1);

    assert.deepEqual(
        fromJson([["blue", "orange", "purple", "white"], "green",
                 ["blue", "orange", "purple", "white"], "red"]),
        split(s1, solid("green"), s1, solid("red")));

    assert.deepEqual(
        fromJson(["green", ["blue", "orange", "purple", "white"],
                  "yellow", ["blue", "orange", "purple", "white"]]),
        split(solid("green"), s1, solid("yellow"), s1));
  });

});
