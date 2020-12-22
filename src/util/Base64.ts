function atob(value: any) {
  return Buffer.from(value, 'base64').toString('binary');
}

function btoa(value: any) {
  let buffer: Buffer;
  if (value instanceof Buffer) {
    buffer = value;
  } else {
    buffer = Buffer.from(value.toString(), 'binary');
  }
  return buffer.toString('base64');
}

export function base64(value: any): string {
  try {
    const res = btoa(atob(value));
    return res;
    //return res == value ? true : false;
  } catch(ex) {
    return value;
  }
}
