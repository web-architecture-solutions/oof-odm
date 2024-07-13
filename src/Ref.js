export default class Ref {
    static getValue(ref) {
      return ref?.current?.value;
    }
}