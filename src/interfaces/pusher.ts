export interface IPusherMap {
  message: {
    id: number;
    Latitude: string;
    Longitude: string;
    companies_id: number;
    device_code: string;
    duration: string;
    error: number;
    error_code: string;
    error_text: {
      description: string;
    };
    start_time: string;

    // Latitude: "55.982688"
    // Longitude: "37.174990"
    // companies_id: 32
    // device_code: "6999"
    // duration: "99 дней 1 час "
    // error: 0
    // error_code: "68"
    // error_text:
    // description: "Контейнер для кофейной гущи не вставлен, вернуть на место"
    // [[Prototype]]: Object
    // id: 655
    // start_time: "2023-08-23 12:01:43"
  };
}