function checkGPS(value) {
  const errors = {
    gps: [/^\[{0,}-{0,1}\d{1,3}\.\d{5},\s{0,}-{0,1}\d{1,3}\.\d{5}\]{0,}$/, 'Mismatch pattern'],
  };
  const constraint = errors.gps[0];
  if (constraint.test(value)) {
    return true;
  }
  return false;
}

function sendGPS(value) {
  if (!checkGPS(value)) return false;
  const reg = /-{0,1}\d{1,3}\.\d{5}/g;
  const latitude = value.match(reg)[0];
  const longitude = value.match(reg)[1];
  return { latitude, longitude };
}

test('have space', () => {
  const coords = '51.50851, -0.12572';
  expect(sendGPS(coords)).toEqual({ latitude: '51.50851', longitude: '-0.12572' });
});

test('haven`t space', () => {
  const coords = '51.50851,-0.12572';
  expect(sendGPS(coords)).toEqual({ latitude: '51.50851', longitude: '-0.12572' });
});

test('have []', () => {
  const coords = '[51.50851, -0.12572]';
  expect(sendGPS(coords)).toEqual({ latitude: '51.50851', longitude: '-0.12572' });
});
