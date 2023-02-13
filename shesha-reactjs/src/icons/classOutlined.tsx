import React  from 'react';
import Icon, { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ClassOutlinedSvg = () => (
<svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 318.188 318.188">
    <path d="M123.905,232.637c-7.613,0-13.417,2.106-17.409,6.317c-3.993,4.212-5.989,10.31-5.989,18.295
        c0,8.073,2.007,14.222,6.021,18.444c4.016,4.223,9.785,6.334,17.312,6.334c7.636,0,13.434-2.1,17.394-6.301
        c3.959-4.201,5.94-10.337,5.94-18.411c0-8.095-1.97-14.231-5.907-18.411C137.328,234.727,131.541,232.637,123.905,232.637z
            M131.142,267.85c-1.586,2.254-4.02,3.38-7.302,3.38c-6.454,0-9.681-4.638-9.681-13.915c0-9.364,3.248-14.046,9.746-14.046
        c3.194,0,5.596,1.143,7.204,3.429c1.608,2.287,2.412,5.825,2.412,10.617C133.521,262.085,132.728,265.597,131.142,267.85z"/>
    <path d="M201.388,277.794c0,3.129-0.459,5.338-1.378,6.629c-0.919,1.29-2.45,1.936-4.595,1.936c-0.919,0-1.771-0.082-2.56-0.246
        c-0.787-0.164-1.531-0.312-2.231-0.443v10.075c2.122,0.459,4.364,0.689,6.727,0.689c5.689,0,9.954-1.669,12.799-5.005
        c2.844-3.336,4.267-8.253,4.267-14.751v-43.287h-13.029V277.794z"/>
    <path d="M283.149,52.722L232.625,2.197C231.218,0.79,229.311,0,227.321,0H40.342c-4.143,0-7.5,3.358-7.5,7.5v303.188
        c0,4.142,3.357,7.5,7.5,7.5h237.504c4.143,0,7.5-3.358,7.5-7.5V58.025C285.346,56.036,284.556,54.129,283.149,52.722z
            M234.821,25.606l24.918,24.919h-24.918V25.606z M47.842,15h171.979v10.263H47.842V15z M47.842,303.188V40.263h171.979v17.763
        c0,4.142,3.357,7.5,7.5,7.5h43.024v237.662H47.842z"/>
    <path d="M194.706,70.602c-1.407-1.407-3.314-2.197-5.304-2.197h-85.811c-4.143,0-7.5,3.358-7.5,7.5v85.811
        c0,1.989,0.79,3.897,2.196,5.303l23.507,23.506c1.357,1.357,3.232,2.197,5.304,2.197h85.811c4.143,0,7.5-3.358,7.5-7.5v-85.81
        c0-2.071-0.84-3.946-2.196-5.303L194.706,70.602z M119.599,167.116l-8.507-8.506V94.012l8.507,8.507V167.116z M121.699,83.405
        h64.597l8.506,8.506h-64.596L121.699,83.405z M205.409,177.722h-70.811v-70.811h70.811V177.722z"/>
    <path d="M190.788,260.171c-1.335-1.838-3.49-3.15-6.465-3.938v-0.328c2.253-0.547,4.069-1.772,5.447-3.676
        c1.379-1.903,2.068-4.201,2.068-6.892c0-4.091-1.581-7.105-4.742-9.041c-3.162-1.936-8.003-2.905-14.522-2.905h-16.736v47.979
        h18.673c5.644,0,10.102-1.252,13.373-3.758c3.271-2.505,4.906-5.934,4.906-10.288
        C192.79,264.394,192.122,262.009,190.788,260.171z M172.444,243.204c4.069,0,6.104,1.346,6.104,4.037
        c0,1.51-0.508,2.647-1.525,3.413c-1.018,0.766-2.456,1.148-4.315,1.148h-3.905v-8.598H172.444z M173.362,271.362h-4.561v-10.075
        h4.299c2.057,0,3.626,0.427,4.709,1.28c1.083,0.853,1.625,2.079,1.625,3.676C179.434,269.655,177.409,271.362,173.362,271.362z"
        />
</svg>);

export const ClassOutlined = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ClassOutlinedSvg} {...props} />
);