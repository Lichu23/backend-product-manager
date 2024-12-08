import db from "../config/db";
import { connectDB } from "../server";


jest.mock("../config/db");

describe("connectDB", () => {
  it("should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate") //
      .mockRejectedValueOnce(new Error("Hubo un error al conectar con la DB")); 
    
      const consoleSpy = jest.spyOn(console, "log");

    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Hubo un error al conectar con la DB")
    )
  });
});
