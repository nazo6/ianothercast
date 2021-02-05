export type AuthRequestBodyType =
  | {
      email_address: string; //'nazorgt@gmail.com'
      password: string; //'8Bdl3vTHBUC96dKXLxMf'
      mode: 'status';
      client: string; //'website'
      device_name: string; //'Website (Chrome, Win32)'
      version: string; //'3.1'
      supported_types: boolean; //false
      url: '//api.ibroadcast.com/s/JSON/status';
    }
  | {
      _userid: string;
      _token: string;
      mode: 'status';
      client: string;
      device_name: string;
      version: string;
      supported_types: boolean;
      url: string;
    };
