import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name:'Test Name',
    description:'blah',
    url:'https://megak.pl',
    price: 0,
    lat: 9,
    lon: 9,

}


test('Can build AdRecord',()=> {
    const ad = new AdRecord(defaultObj)

    expect(ad.name).toBe('Test Name');
    expect(ad.description).toBe('blah');

});

test('Validates invalid price',()=> {
    expect(()=> new AdRecord({
        ...defaultObj,
    price: -3,
    })).toThrow('The price cannot be less than 0 or greater than 9,999,999')

   });

