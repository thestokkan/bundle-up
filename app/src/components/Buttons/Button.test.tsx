import { default as Button } from './Button';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("My Button component", () => {
    const buttonText = "click me";
    let value = 0;

    const increaseValueByOne = () => {
        value++;
    };

    test("should show the correct text", () => {
        render(<Button type="default" children={buttonText} onClick={increaseValueByOne} />);

        const button = screen.getByTestId("myBtn"); // Use id, don't look up things based on text!

        expect(button).toBeInTheDocument();
        expect(screen.getByTestId("myBtn")).toHaveTextContent(buttonText);
    });

    test("should execute callback on click", async () => {
        render(<Button type="default" children={buttonText} onClick={increaseValueByOne} />);

        const button = screen.getByTestId("myBtn");

        await userEvent.click(button); // Simulate button click, needs async function

        expect(button).toBeInTheDocument();
        expect(value).toEqual(1);
    });

    test("should execute callback on several clicks", async () => {
        render(<Button type="default" children={buttonText} onClick={increaseValueByOne} />);

        const button = screen.getByTestId("myBtn");

        const numberOfClicks = 3;

        for (let index = 0; index < numberOfClicks; index++) {
            await userEvent.click(button);
        }

        expect(button).toBeInTheDocument();
        expect(value).toEqual(numberOfClicks);
    });

    // Cleanup: Runs after each test
    afterEach(() => {
        value = 0;
    });
});