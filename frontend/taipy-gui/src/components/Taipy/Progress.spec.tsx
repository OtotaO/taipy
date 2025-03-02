/*
 * Copyright 2021-2024 Avaiga Private Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Progress from "./Progress";

describe("Progress component", () => {
    it("renders circular progress without value (indeterminate)", () => {
        const { getByRole } = render(<Progress />);
        const elt = getByRole("progressbar");
        expect(elt).toHaveClass("MuiCircularProgress-root");
    });

    it("uses the class", async () => {
        const { getByRole } = render(<Progress className="taipy-progress" />);
        const elt = getByRole("progressbar");
        expect(elt).toHaveClass("taipy-progress");
    });

    it("renders circular progress with value (determinate)", () => {
        const { getByRole, getByText } = render(<Progress showValue value={50} />);
        const elt = getByRole("progressbar");
        const valueText = getByText("50%");
        expect(elt).toHaveClass("MuiCircularProgress-root");
        expect(valueText).toBeInTheDocument();
    });

    it("renders linear progress without value (indeterminate)", () => {
        const { getByRole } = render(<Progress linear />);
        const elt = getByRole("progressbar");
        expect(elt).toHaveClass("MuiLinearProgress-root");
    });

    it("renders linear progress with value (determinate)", () => {
        const { getByRole, getByText } = render(<Progress linear showValue value={50} />);
        const elt = getByRole("progressbar");
        const valueText = getByText("50%");
        expect(elt).toHaveClass("MuiLinearProgress-root");
        expect(valueText).toBeInTheDocument();
    });

    it("does not render when render prop is false", async () => {
        const { container } = render(<Progress render={false} />);
        expect(container.firstChild).toBeNull();
    });

    it("should render the title when title is defined", () => {
        const { getByText } = render(<Progress title="Title" />);
        const title = getByText("Title");
        expect(title).toBeInTheDocument();
    });

    it("renders Typography with correct sx and variant", () => {
        const { getByText } = render(<Progress title="Title" />);
        const typographyElement = getByText("Title");
        expect(typographyElement).toBeInTheDocument();
        expect(typographyElement).toHaveStyle("margin: 8px");
        expect(typographyElement.tagName).toBe("SPAN");
    });

    it("renders determinate progress correctly", () => {
        const { getByRole } = render(<Progress value={50} />);
        const progressBar = getByRole("progressbar");
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveAttribute("aria-valuenow", "50");
    });

    it("renders determinate progress with linear progress bar", () => {
        const { getByRole } = render(<Progress value={50} linear />);
        const progressBar = getByRole("progressbar");
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveAttribute("aria-valuenow", "50");
    });

    it("renders title and linear progress bar correctly", () => {
        const { getByText, getByRole } = render(<Progress title="Title" value={50} linear showValue={true} />);
        const title = getByText("Title");
        const progressBar = getByRole("progressbar");
        expect(title).toBeInTheDocument();
        expect(progressBar).toBeInTheDocument();
    });

    it("renders title and linear progress bar without showing value", () => {
        const { getByText, queryByText } = render(<Progress title="Title" value={50} linear />);
        const title = getByText("Title");
        const value = queryByText("50%");
        expect(title).toBeInTheDocument();
        expect(value).toBeNull();
    });

    it("renders title and circular progress bar correctly", () => {
        const { getByText, getByRole } = render(<Progress title="Title" value={50} showValue={true} />);
        const title = getByText("Title");
        const progressBar = getByRole("progressbar");
        expect(title).toBeInTheDocument();
        expect(progressBar).toBeInTheDocument();
    });

    it("displays title above progress", () => {
        const { container } = render(<Progress titleAnchor="top" />);
        const box = container.querySelector(".MuiBox-root");
        expect(box).toHaveStyle("flex-direction: column");
    });

    it("displays title to the left of progress", () => {
        const { container } = render(<Progress titleAnchor="left" />);
        const box = container.querySelector(".MuiBox-root");
        expect(box).toHaveStyle("flex-direction: row");
    });

    it("displays title to the right of progress", () => {
        const { container } = render(<Progress titleAnchor="right" />);
        const box = container.querySelector(".MuiBox-root");
        expect(box).toHaveStyle("flex-direction: row-reverse");
    });

    it("displays title at the bottom of progress", () => {
        const { container } = render(<Progress titleAnchor="bottom" />);
        const box = container.querySelector(".MuiBox-root");
        expect(box).toHaveStyle("flex-direction: column-reverse");
    });

    it("displays the title at the bottom of the progress bar when the title anchor is undefined", () => {
        const { container } = render(<Progress />);
        const box = container.querySelector(".MuiBox-root");
        expect(box).toHaveStyle("flex-direction: column-reverse");
    });

    it("applies color to linear progress when color is defined", () => {
        const { container } = render(<Progress linear value={50} color="red" />);
        const linearProgressBar = container.querySelector(".MuiLinearProgress-bar");
        expect(linearProgressBar).toHaveStyle("background: red");
    });

    it("does not apply color to linear progress when color is undefined", () => {
        const { container } = render(<Progress linear value={50} />);
        const linearProgressBar = container.querySelector(".MuiLinearProgress-bar");
        expect(linearProgressBar).not.toHaveStyle("background: red");
    });

    it("applies color to circular progress when color is defined", () => {
        const { container } = render(<Progress linear={false} value={50} color="blue" />);
        const circularProgressCircle = container.querySelector(".MuiCircularProgress-circle");
        expect(circularProgressCircle).toHaveStyle("color: blue");
    });

    it("does not apply color to circular progress when color is undefined", () => {
        const { container } = render(<Progress linear={false} value={50} />);
        const circularProgressCircle = container.querySelector(".MuiCircularProgress-circle");
        expect(circularProgressCircle).not.toHaveStyle("color: blue");
    });
});

describe("Progress functions", () => {
    it("renders title and linear progress bar correctly", () => {
        const { getByText, getByRole } = render(<Progress title="Title" value={50} linear showValue={true} />);
        const title = getByText("Title");
        const progressBar = getByRole("progressbar");
        expect(title).toBeInTheDocument();
        expect(progressBar).toBeInTheDocument();
    });
});
