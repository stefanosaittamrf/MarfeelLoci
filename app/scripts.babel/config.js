const INVALIDATE_LEVEL_MAX = 8;

const getInvalidateArray = () => Array.apply(null, Array(INVALIDATE_LEVEL_MAX)).map((_, idx) => idx+1)

const optionList = {
  types: [
    'MarfeelTouch',
    'AMP',
    'Single Item'
  ],
  envParams: {
    mrfdev: [
      'true'
    ],
    mrfgarda: [
      'off'
    ],
    deepLinking: [
      'true'
    ],
    mrfbm: [
      'OAP',
      'enterprise'
    ],
    mrfads: [
      '1',
      '2',
      '277'
    ],
    mrfdevice: [
      's',
      'm',
      'l',
      'xl'
    ]
  },
  invalidate: getInvalidateArray()
};

export default optionList;
