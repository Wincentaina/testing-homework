import { expect } from "chai";
import renderer from "react-test-renderer";
import { Contacts } from "../../src/client/pages/Contacts";
import { Delivery } from "../../src/client/pages/Delivery";
import { Home } from "../../src/client/pages/Home";

it("статичные страницы", () => {
    const contacts = renderer.create(Contacts);
    const delivery = renderer.create(Delivery);
    const home = renderer.create(Home);

    expect(contacts).not.undefined;
    expect(delivery).not.undefined;
    expect(home).not.undefined;
})