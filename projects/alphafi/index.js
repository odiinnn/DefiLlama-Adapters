const ADDRESSES = require('../helper/coreAssets.json')
const sui = require("../helper/chain/sui")
const { addUniV3LikePosition } = require("../helper/unwrapLPs")
const { log } = require('../helper/utils')

const ALPHAFI_CETUS_TVL_IDS = [
  {
//usdt wusdc
    poolID: "0x30066d9879374276dc01177fbd239a9377b497bcd347c82811d75fcda35b18e5",
    parentPoolID: "0xc8d7a1503dc2f9f5b05449a87d8733593e2f0f3e7bffd90541252782e4d2ca20",
    investorID: "0x87a76889bf4ed211276b16eb482bf6df8d4e27749ebecd13017d19a63f75a6d5",
    token0Type: ADDRESSES.sui.USDT,
    token1Type: ADDRESSES.sui.USDC
  },
  { //usdy wusdc
    poolID: "0xa7239a0c727c40ee3a139689b16b281acfd0682a06c23531b184a61721ece437",
    parentPoolID: "0x0e809689d04d87f4bd4e660cd1b84bf5448c5a7997e3d22fc480e7e5e0b3f58d",
    investorID: "0x1b923520f19660d4eb013242c6d03c84fdea034b8f784cfd71173ef72ece50e1",
    token0Type: ADDRESSES.sui.USDY,
    token1Type: ADDRESSES.sui.USDC
  },
  { //wusdc sui
    poolID: "0xee6f6392cbd9e1997f6e4cf71db0c1ae1611f1f5f7f23f90ad2c64b8f23cceab",
    parentPoolID: "0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630",
    investorID: "0xb6ca8aba0fb26ed264a3ae3d9c1461ac7c96cdcbeabb01e71086e9a8340b9c55",
    token0Type: ADDRESSES.sui.USDC,
    token1Type: ADDRESSES.sui.SUI
  },
  {
    //wusdc wbtc
    poolID: "0x676fc5cad79f51f6a7d03bfa3474ecd3c695d322380fc68e3d4f61819da3bf8a",
    parentPoolID: "0xaa57c66ba6ee8f2219376659f727f2b13d49ead66435aa99f57bb008a64a8042",
    investorID: "0x9ae0e56aa0ebc27f9d8a17b5a9118d368ba262118d878977b6194a10a671bbbc",
    token0Type: ADDRESSES.sui.USDC,
    token1Type: ADDRESSES.sui.WBTC
  },
  {
    // weth wusdc
    poolID: "0xbdf4f673b34274f36be284bca3f765083380fefb29141f971db289294bf679c6",
    parentPoolID: "0x5b0b24c27ccf6d0e98f3a8704d2e577de83fa574d3a9060eb8945eeb82b3e2df",
    investorID: "0x05fa099d1df7b5bfb2e420d5ee2d63508db17c40ce7c4e0ca0305cd5df974e43",
    token0Type: ADDRESSES.sui.WETH,
    token1Type: ADDRESSES.sui.USDC
  },
  { //navx sui
    poolID: "0x045e4e3ccd383bedeb8fda54c39a7a1b1a6ed6a9f66aec4998984373558f96a0",
    parentPoolID: "0x0254747f5ca059a1972cd7f6016485d51392a3fde608107b93bbaebea550f703",
    investorID: "0xdd9018247d579bd7adfdbced4ed39c28821c6019461d37dbdf32f0d409959b1c",
    token0Type: "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
    token1Type: ADDRESSES.sui.SUI
  },
  {
    // buck wusdc
    poolID: "0x59ff9c5df31bfd0a59ac8393cf6f8db1373252e845958953e6199952d194dae4",
    parentPoolID: "0x81fe26939ed676dd766358a60445341a06cea407ca6f3671ef30f162c84126d5",
    investorID: "0x8051a9ce43f9c21e58331b1ba2b1925e4ae4c001b1400459236d86d5d3d2888b",
    token0Type: ADDRESSES.sui.BUCK,
    token1Type: ADDRESSES.sui.USDC
  },
  {//wsol wusdc
    poolID: "0xd50ec46c2514bc8c588760aa7ef1446dcd37993bc8a3f9e93563af5f31b43ffd",
    parentPoolID: "0x9ddb0d269d1049caf7c872846cc6d9152618d1d3ce994fae84c1c051ee23b179",
    investorID: "0x74308f0de7ea1fc4aae2046940522f8f79a6a76db94e1227075f1c2343689882",
    token0Type: ADDRESSES.sui.SOL,
    token1Type: ADDRESSES.sui.USDC
  },
  {
    //sca sui
    poolID: "0x6eec371c24ad264ced3a1f40b83d7d720aa2b0afa860a6af85436f6a769842e1",
    parentPoolID: "0xaa72bd551b25715b8f9d72f226fa02526bdf2e085a86faec7184230c5209bb6e",
    investorID: "0x651acc1166023a08c17f24e71550982400e9b1f4950cc1324410300efc1af905",
    token0Type: "0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA",
    token1Type: ADDRESSES.sui.SUI
  },
  // usdc sui
  {
    poolID: "0x727882553d1ab69b0cabad2984331e7e39445f91cb4046bf7113c36980685528",
    parentPoolID: "0xb8d7d9e66a60c239e7a60110efcf8de6c705580ed924d0dde141f4a0e2c90105",
    investorID: "0xba6acd0350eab1c6bc433b6c869e5592fe0667ae96a3115f89d5c79dd78396ef",
    token0Type: ADDRESSES.sui.USDC_CIRCLE,
    token1Type: ADDRESSES.sui.SUI
  },
  // usdc usdt
  {
    poolID: "0xa213f04c6049f842a7ffe7d39e0c6138a863dc6e25416df950d23ddb27d75661",
    parentPoolID: "0x6bd72983b0b5a77774af8c77567bb593b418ae3cd750a5926814fcd236409aaa",
    investorID: "0xe553be450b7290025d5810da45102abdbaa211c5735e47f6740b4dd880edc0bd",
    token0Type: ADDRESSES.sui.USDC_CIRCLE,
    token1Type: ADDRESSES.sui.USDT
  },
  // usdc wusdc
  {
    poolID: "0x568a47adf2b10219f0973a5600096822b38b4a460c699431afb6dad385614d66",
    parentPoolID: "0x1efc96c99c9d91ac0f54f0ca78d2d9a6ba11377d29354c0a192c86f0495ddec7",
    investorID: "0x6cc5e671a2a6e9b8c8635ff1fb16ae62abd7834558c3a632d97f393c0f022972",
    token0Type: ADDRESSES.sui.USDC_CIRCLE,
    token1Type: ADDRESSES.sui.USDC
  },
  // usdc eth
  {
    poolID: "0xc04f71f32a65ddf9ebf6fb69f39261457da28918bfda5d3760013f3ea782a594",
    parentPoolID: "0x9e59de50d9e5979fc03ac5bcacdb581c823dbd27d63a036131e17b391f2fac88",
    investorID: "0xb0bff60783536f9dc0b38e43150a73b73b8a4f1969446f7721e187821915bd00",
    token0Type: ADDRESSES.sui.USDC_CIRCLE,
    token1Type: ADDRESSES.sui.ETH
  },
  // deep sui
  {
    poolID: "0xff496f73a1f9bf7461882fbdad0c6c6c73d301d3137932f7fce2428244359eaa",
    parentPoolID: "0xe01243f37f712ef87e556afb9b1d03d0fae13f96d324ec912daffc339dfdcbd2",
    investorID: "0x5e195363175e4b5139749d901ddd5ef1ffc751777a7051b558c45fa12f24abc3",
    token0Type: ADDRESSES.sui.DEEP,
    token1Type: ADDRESSES.sui.SUI
  },
  // buck sui
  {
    poolID: "0xeb44ecef39cc7873de0c418311557c6b8a60a0af4f1fe1fecece85d5fbe02ab5",
    parentPoolID: "0x59cf0d333464ad29443d92bfd2ddfd1f794c5830141a5ee4a815d1ef3395bf6c",
    investorID: "0x9b7c9b6086d3baf413bccdfbb6f60f04dedd5f5387dee531eef5b811afdfaedc",
    token0Type: ADDRESSES.sui.BUCK,
    token1Type: ADDRESSES.sui.SUI
  },
  // fud sui
  {
    poolID: "0x005a2ebeb982a1e569a54795bce1eeb4d88900b674440f8487c2846da1706182",
    parentPoolID: "0xfc6a11998f1acf1dd55acb58acd7716564049cfd5fd95e754b0b4fe9444f4c9d",
    investorID: "0xaa17ff01024678a94381fee24d0021a96d4f3a11855b0745facbb5d2eb9df730",
    token0Type: "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD",
    token1Type: ADDRESSES.sui.SUI
  },
  // usdc suiusdt
  {
    poolID: "0x59ec4223043e2bbbcd519bf161088b81946193b0580d6ce94b48e9cb659c6efa",
    parentPoolID: "0x7df346f8ef98ad20869ff6d2fc7c43c00403a524987509091b39ce61dde00957",
    investorID: "0x6285c57b0d86cbe585abfe5b23d74f96243f450381ef4d57604164e76a76f4c8",
    token0Type: ADDRESSES.sui.USDC_CIRCLE,
    token1Type: ADDRESSES.sui.suiUSDT
  },
]

const ALPHAFI_BLUEFIN_TVL_IDS = [
  { //sui usdc
    poolID: "0x99b9bd1d07690a658b9723509278b83715f7c4bec2bc5983316c002b597dfabd",
    parentPoolID: "0x3b585786b13af1d8ea067ab37101b6513a05d2f90cfe60e8b1d9e1b46a63c4fa",
    investorID: "0x863909d3ced121e06053dec3fd2cb08ecda4c54607ad1b3f4fc8c75267c8012c",
    token0Type: ADDRESSES.sui.SUI,
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //usdt usdc
    poolID: "0x8d9220587b2969429c517e76b3695f01cb3749849d69937c4140a6715bf14c7f",
    parentPoolID: "0x0321b68a0fca8c990710d26986ba433d06b351deba9384017cd6175f20466a8f",
    investorID: "0x114bf16bd3504d6f491e35152d54f5340d66d7c6abaca7689b9081cd3af0cd93",
    token0Type: ADDRESSES.sui.USDT,
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //sui BUCK
    poolID: "0x58c4a8c5d18c61156e1a5a82811fbf71963a4de3f5d52292504646611a308888",
    parentPoolID: "0xe63329f43a9474d421be85ff270bafc04667b811d215d4d4ee2512bcf2713896",
    investorID: "0xc04ef6923ae5cf047cf853d2fa809ab56dbe712ca95f87c5f3c12dcfe66f7ecd",
    token0Type: ADDRESSES.sui.SUI,
    token1Type: ADDRESSES.sui.BUCK
  },
  { //AUSD usdc
    poolID: "0x8ed765497eeedf7960af787c0c419cb2c01c471ab47682a0619e8588c06a9aa6",
    parentPoolID: "0x881639630836b703aa3e04898f8a3740584859838d986619d0ee0f63a784c078",
    investorID: "0x1f9f325dfb23a3516679cd7bda58c26791b2a34c40ce5e1cd88ee6f8361a0ea6",
    token0Type: "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD",
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //sui ausd
    poolID: "0x89793208211927a4d1458a59d34b775aaec17af8c98a59a1ba97f7b005c0e587",
    parentPoolID: "0xb30df44907da6e9f3c531563f19e6f4a203d70f26f8a33ad57881cd7781e592d",
    investorID: "0x275e4df83f6f7b9dc75504d02e5d32f21ca03a5a8b017c622a8b42d3671e2888",
    token0Type: ADDRESSES.sui.SUI, 
    token1Type: "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD"
  },
  { //wbtc usdc
    poolID: "0xbc0de037958d7988710c40f4e7317f8f3ffca4fa3cc9e1c18bc1ebd7ec65cd6e",
    parentPoolID: "0x38282481e3a024c50254c31ebfc4710e003fe1b219c0aa31482a860bd58c4ab0",
    investorID: "0x9d14a391953d5b853fb22c4135657da341f4db3b341dd4d5f603cfb008e91745",
    token0Type: ADDRESSES.sui.WBTC,
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //navx vsui
    poolID: "0xf495b997ae10b8bb0996c1ee56a1cc7832daec36a9380e0932e41256d97cabad",
    parentPoolID: "0xa0b4fef70ccef039b94512d6384806979d4c201c5e12af9a4b0458454b80da35",
    investorID: "0x3672719d64416d0f04575b500e853d9101dfca6488f705856c59ace1999e99d1",
    token0Type: "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
    token1Type: "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT"
  },
  { //blue sui
    poolID: "0xddecab961380225c95e6a6089660de2e6028170fbc2cd07ab79b8bf45e3c2645",
    parentPoolID: "0xde705d4f3ded922b729d9b923be08e1391dd4caeff8496326123934d0fb1c312",
    investorID: "0x56f05fc7b81cf45b8b223de9daba1ba82bf4ce32ba0bfa46c2780d78216b2b92",
    token0Type: "0xe1b45a0e641b9955a20aa0ad1c1f4ad86aad8afb07296d4085e349a50e90bdca::blue::BLUE",
    token1Type: ADDRESSES.sui.SUI
  },
  { //blue usdc
    poolID: "0x4b28663453af487a81d4fb2ba7c96cccd63978b83f950d3dcf60dd88116e3e91",
    parentPoolID: "0x3717c637003c4274f20cde8c4eeadbffa2bbf16d995a0fe0f7bf99c03cf52e61",
    investorID: "0xb1a991064c4cbf1d7fb64a01ce8b2e3aa2f7d25b3ff8de7cabc1cb9ccc0fc12f",
    token0Type: "0xe1b45a0e641b9955a20aa0ad1c1f4ad86aad8afb07296d4085e349a50e90bdca::blue::BLUE",
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //send usdc
    poolID: "0xd5757d9f00db3f21a0fa38a86a5c1d52ae44828cc59f1798550e2ccf260b2a34",
    parentPoolID: "0xbd5b29a952040ccd47ce2822bddd4aba3affaae9d6ccdaf65aded5528e39b837",
    investorID: "0xa57b9da796a2848853de7478ec64db63213cb409bfdf182c8b20c7a64896cbcc",
    token0Type: "0xb45fcfcc2cc07ce0702cc2d229621e046c906ef14d9b25e8e4d25f6e8763fef7::send::SEND",
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //wbtc sui
    poolID: "0x31cc72ec8a332d5e0ecd65c8d5d778333e1c8432a8826a88a8c51eb4e7dc6fac",
    parentPoolID: "0xe71aa89df60e737f1b687f8dfbd51e2a9b35706e9e5540ce9b053bd53fcb9ec3",
    investorID: "0x68d23ee66a167e39513747a75dd4af3fd2b5728a4653566bf3e813f684cf748b",
    token0Type: ADDRESSES.sui.WBTC,
    token1Type: ADDRESSES.sui.SUI
  },
  { //deep sui
    poolID: "0x46de57bfaa096c674492c3892caa261cf34cc46a2e539ece91f0db3e46e3f6c3",
    parentPoolID: "0x1b06371d74082856a1be71760cf49f6a377d050eb57afd017f203e89b09c89a2",
    investorID: "0x92454fe9c315328efb29607c30f6fb7b5ec55c0a8d9944285075386e381bbca0",
    token0Type: ADDRESSES.sui.DEEP,
    token1Type: ADDRESSES.sui.SUI
  },
  { //stsui sui
    poolID: "0xf5e643282e76af102aada38c67aae7eaec1ba2fe3301871f9fcca482893f96f2",
    parentPoolID: "0x73549e0918d10727e324ebeed11ab81ab46f8fadb11078a0641f117d9097b725",
    investorID: "0xe348b843a54463afe5438fa76df127b2b78bc89caa9018ba70b3c2ba043f6a1e",
    token0Type: "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI",
    token1Type: ADDRESSES.sui.SUI
  },
  { // stsui usdc
    poolID: "0x95f0543f861584f1a3c3129c46901d5c5cc1d44e77eb57aab63eec55cd128f29",
    parentPoolID: "0x151d6959cb2a6d1a5b6cfec6d1eae690af0318e46e5fb3ec45dd4e3b67eebeda",
    investorID: "0x65e4af88e543e41c410f969801d53e40acb23da7be811e4c61d05a7d7d235b3b",
    token0Type: "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI",
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { // alpha stsui
    poolID: "0xd601c2d1f451a1493e8d071482272a83e6dafbcdb82b249ca5b3ac909c4138f3",
    parentPoolID: "0xd4051b5dc76ca354e48813268aa79de38b274878ef6a9d274066ae5a47f46cc6",
    investorID: "0x959f6df092073b23c0ad0278a9cf070b6779f2edc9b7124108207b4d7b4e94ca",
    token0Type: "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA",
    token1Type: "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI"
  },
  { // suiusdt usdc
    poolID: "0x5b975bf7d0f0e3784a5b2db8f0a3e0b45cdcc31b39a222e680716a6ad7eba67f",
    parentPoolID: "0x0bd95d012d60190a6713ae51f2d833b24ae70c5fb07fcfb41db40f25549878b1",
    investorID: "0x23c073d557e4512f1811bd7c767047de13de14c59bb9607373613531250910b7",
    token0Type: ADDRESSES.sui.suiUSDT,
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { // stsui buck
    poolID: "0xdee56209e25c0eafdd3e06ee9f4aae03d173478d158fb4c5c1fbae7c75d4cd72",
    parentPoolID: "0x0bc35f5b7e7b77dadc62c2630e9efafb1beb4122fd5393bf3b99586abf3ca8b1",
    investorID: "0xb5633adb8cfb5a4e6580002b21bc403d5d096dbca07495986b4882619ce05279",
    token0Type: "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI",
    token1Type: ADDRESSES.sui.BUCK
  },
  { // stsui musd
    poolID: "0xb251e187a4e688dd3dbbf378e4aacfdd41de6a81e2a4bc10c7b80e056c1da630",
    parentPoolID: "0x0da4bcb1669ae3b6ce80f024e3a2076e2c4e2cc899d4724fce94da0f729bc968",
    investorID: "0xa8a705f8819e01396927c1ec179a140750597ed3b5268d205bbf5240979fda86",
    token0Type: "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI",
    token1Type: "0xe44df51c0b21a27ab915fa1fe2ca610cd3eaa6d9666fe5e62b988bf7f0bd8722::musd::MUSD"
  },
  { // wBTC-USDC
    poolID: "0x4043b9e628d0cc6c2e3f322e6a7bddf603a3bcc084992355b55f4c23516bb6ba",
    parentPoolID: "0xf0e4772e80800550368973d1f8ab2c9a7241ace8df8770452ee2bf3e3e67b8a1",
    investorID: "0x6876c4b19075ee774ca368a4a782c9425cca97251093dafa7ff239a846b3ee30",
    token0Type: "0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::BTC",
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //stsui sui
    poolID: "0x0b45d1e5889b524dc1a472f59651cdedb8e0a2678e745f27975a9b57c127acdd",
    parentPoolID: "0x73549e0918d10727e324ebeed11ab81ab46f8fadb11078a0641f117d9097b725",
    investorID: "0xaec347c096dd7e816febd8397be4cca3aabc094a9a2a1f23d7e895564f859dc2",
    token0Type: "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI",
    token1Type: ADDRESSES.sui.SUI
  },
  { //suibtc usdc
    poolID: "0x4043b9e628d0cc6c2e3f322e6a7bddf603a3bcc084992355b55f4c23516bb6ba",
    parentPoolID: "0xf0e4772e80800550368973d1f8ab2c9a7241ace8df8770452ee2bf3e3e67b8a1",
    investorID: "0x6876c4b19075ee774ca368a4a782c9425cca97251093dafa7ff239a846b3ee30",
    token0Type: "0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::BTC",
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //lbtc suibtc
    poolID: "0xd30d849bbddd0c1bc0e2eb552c2dacdf4ae998cc03cd485640eb3db7f456e295",
    parentPoolID: "0x7df346f8ef98ad20869ff6d2fc7c43c00403a524987509091b39ce61dde00957",
    investorID: "0x43523544dd4e7900ac6aeb8299e1aebd5d72bf7fae97f1a3b988c31e08b1bacc",
    token0Type: "0x3e8e9423d80e1774a7ca128fccd8bf5f1f7753be658c5e645929037f7c819040::lbtc::LBTC",
    token1Type: "0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::BTC"
  },
]
const ALPHAFI_BLUEFIN_AUTOBALANCE_TVL_IDS = [
  { //sui usdc
    poolID: "0x1ec0aacf500624de90dd21478da12fca4726b3837e78993aee1c82f631e8364d",
    parentPoolID: "0x3b585786b13af1d8ea067ab37101b6513a05d2f90cfe60e8b1d9e1b46a63c4fa",
    investorID: "0xcf2a8bfaafd4b50f068826e3e4217925b4280836d8f182e3481c3725269c2a1f",
    token0Type: ADDRESSES.sui.SUI,
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //usdt usdc
    poolID: "0x65a167f16da65732fc71ec5b8714e5beb293e931d54820f1fea188bbcf09383d",
    parentPoolID: "0x0321b68a0fca8c990710d26986ba433d06b351deba9384017cd6175f20466a8f",
    investorID: "0x685c0569675bb46b838941568f1123c03eeef374dc4160c7d9b3abbc3b93f25c",
    token0Type: ADDRESSES.sui.USDT,
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //suiUsdt Usdc
    poolID: "0x8b68333ff71fa008bb2c8bc26d5989fba51cec27393172bb6bbfdbd360489542",
    parentPoolID: "0x0bd95d012d60190a6713ae51f2d833b24ae70c5fb07fcfb41db40f25549878b1",
    investorID: "0x07506ea66cb73fa60dbea5177c974ca6c98d7cd8ee2fae631af6e79f139f99ec",
    token0Type: ADDRESSES.sui.suiUSDT,
    token1Type: ADDRESSES.sui.USDC_CIRCLE
  },
  { //deep sui
    poolID: "0x76fb78985fae4cf24bcd933ea5e8a6e818e9d4b51c091c4c4a78b6720199e81e",
    parentPoolID: "0x1b06371d74082856a1be71760cf49f6a377d050eb57afd017f203e89b09c89a2",
    investorID: "0x217a85380d0cf4b4c5a870b8f6d11b8e3bc66de87e86d0376080ca7e60e6506c",
    token0Type: ADDRESSES.sui.DEEP,
    token1Type: ADDRESSES.sui.SUI
  },
  { //blue sui
    poolID: "0xb8cf0bf8b39f465c1b845e5ee8c2c53424c3faf97fb8e0ef1139abb9001e844a",
    parentPoolID: "0xde705d4f3ded922b729d9b923be08e1391dd4caeff8496326123934d0fb1c312",
    investorID: "0xf7785cf8b3d3f9bee48bf4d90a142d7ec98b25d6784408ffedc11633d7124197",
    token0Type: "0xe1b45a0e641b9955a20aa0ad1c1f4ad86aad8afb07296d4085e349a50e90bdca::blue::BLUE",
    token1Type: ADDRESSES.sui.SUI
  },
  { //deep blue
    poolID: "0x37671a77fb00a3323304f2586d18694bb93a6bc840e8184634ebe66d69eb48db",
    parentPoolID: "0x4b8271fc4819078e44ee9a0506a824b77464789d57ace355d0562a4776c51840",
    investorID: "0x90364be9cca6c1df042f269fb944fd49ba1c74688789fe33329aa6d40ac8552a",
    token0Type: ADDRESSES.sui.DEEP,
    token1Type: "0xe1b45a0e641b9955a20aa0ad1c1f4ad86aad8afb07296d4085e349a50e90bdca::blue::BLUE"
  },
  { //sui lbtc
    poolID: "0xafc0dc5166233af565e30e24755c401ff8958a28a8fdfdbbf407236b67725695",
    parentPoolID: "0xa0153768c7ed857ffd8bad4708da873fb7825a6878e5f4c83f5df4c091933e56",
    investorID: "0x7a8fc71060975c6e16083c723f376eaf41aab466d0a773c06a68f8f07040998a",
    token0Type: ADDRESSES.sui.SUI,
    token1Type: "0x3e8e9423d80e1774a7ca128fccd8bf5f1f7753be658c5e645929037f7c819040::lbtc::LBTC"
  },
]
const ALPHAFI_NAVI_TVL_IDS = [
  {
    poolID: "0x643f84e0a33b19e2b511be46232610c6eb38e772931f582f019b8bbfb893ddb3",
    tokenType: ADDRESSES.sui.SUI,
    expo: 9
  },
  {
    poolID: "0x0d9598006d37077b4935400f6525d7f1070784e2d6f04765d76ae0a4880f7d0a",
    tokenType: "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",
    expo: 9
  },
  {
    poolID: "0xc696ca5b8f21a1f8fcd62cff16bbe5a396a4bed6f67909cfec8269eb16e60757",
    tokenType: ADDRESSES.sui.USDT,
    expo: 6,
  },
  {
    poolID: "0x01493446093dfcdcfc6c16dc31ffe40ba9ac2e99a3f6c16a0d285bff861944ae",
    tokenType: ADDRESSES.sui.USDC,
    expo: 6
  },
  {
    poolID: "0xe4eef7d4d8cafa3ef90ea486ff7d1eec347718375e63f1f778005ae646439aad",
    tokenType: ADDRESSES.sui.WETH,
    expo: 8
  },
  {
    poolID: "0x04378cf67d21b41399dc0b6653a5f73f8d3a03cc7643463e47e8d378f8b0bdfa",
    tokenType: ADDRESSES.sui.USDC_CIRCLE,
    expo: 6
  },
  {
    poolID: "0xea3c2a2d29144bf8f22e412ca5e2954c5d3021d3259ff276e3b62424a624ad1f",
    tokenType: ADDRESSES.sui.USDY,
    expo: 6
  },
  {
    poolID: "0x8ebe04b51e8a272d4db107ad19cfbc184d1dafeeaab0b61c26e613b804e7777a",
    tokenType: "0x2053d08c1e2bd02791056171aab0fd12bd7cd7efad2ab8f6b9c8902f14df2ff2::ausd::AUSD",
    expo: 6
  },
  {
    poolID: "0xc37ec956fdef6c217505e62444ab93f833c20923755d67d1c8588c9b093ae00e",
    tokenType: ADDRESSES.sui.ETH,
    expo: 8
  },
  {
    poolID: "0x55b7ae7eb570d3d2ee89a92dd8d958794f1e39c4ee067b28655359c0a152b3aa",
    tokenType: "0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::NS",
    expo: 6
  },
  {
    poolID: "0x35f7260fefe3dde7fa5b4bf1319f15554934a94c74acd4ba54161f99470c348f",
    tokenType: "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
    expo: 9
  },
  {
    poolID: "0xd1125035ab6e2889239442031c130c641b75b430b71057bb79710ad578cc2867",
    tokenType: "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI",
    expo: 9
  },
  { //wBTC
    poolID: "0x17743a10e89b108fd7c048e7737ce09082e3ef91f416ee93c2566c5dd3f438db",
    tokenType: "0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::BTC",
    expo: 8
  },
  {// suiUSDT
    poolID: "0x1d30d1b07d78341810a604ad34734001b3b70362c6502de2220999074429a641",
    tokenType: ADDRESSES.sui.suiUSDT,
    expo: 6
  },
]
const ALPHAFI_NAVI_LOOP_TVL_IDS = [
  { //sui vsui
    poolID: "0xd013a1a0c6f2bad46045e3a1ba05932b4a32f15864021d7e0178d5c2fdcc85e3",
    investorID: "0x36cc3135c255632f9275a5b594145745f8344ce8f6e46d9991ffb17596195869", 
    tokenType: "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",
    expo: 9
  },
  { //usdt usdc
    poolID: "0xdd886dd4828a44b7ae48bb7eaceca1cecedd1dcc06174f66ee398dc0feb71451",
    investorID: "0xe512e692f4d48a79abcfd5970ccb44d6f7f149e81bb077ccd58b89d4ab557d0e",
    tokenType: ADDRESSES.sui.USDT,
    expo: 6
  },
  { //usdc usdt
    poolID: "0xb90c7250627e0113df2e60d020df477cac14ca78108e3c5968230f3e7d4d8846",
    investorID: "0x3b9fe28a07e8dd5689f3762ba45dbdf10bd5f7c85a14432928d9108a61ef2dc2",
    tokenType: ADDRESSES.sui.USDC_CIRCLE,
    expo: 6
  },
  { //hasui sui
    poolID: "0x4b22c2fc59c7697eea08c1cc1eadf231415d66b842875ba4730a8619efa38ced",
    investorID: "0xa65eaadb556a80e4cb02fe35efebb2656d82d364897530f45dabc1e99d15a8a9",
    tokenType: "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
    expo: 9
  },
  { //stsui sui
    poolID: "0xc4caf2d31693974b838ffb83b0c8ae880a6b09ca251a07062cf66453bf3e3ce0",
    investorID: "0x3e8937974f3dac64eb8ee9f86a80ccc24852bd2f74d18753d071bbdad73a4c97",
    tokenType: "0xd1b72982e40348d069bb1ff701e634c117bb5f741f44dff91e472d3b01461e55::stsui::STSUI",
    expo: 9
  },
]
const ALPHAFI_BUCKET_TVL_IDS = [
  {
    poolID: "0x2c5c14b9fb21f93f36cac0f363acf59ecb21f34c4c9b1a1b383f635ecdc7b507",
    tokenType: ADDRESSES.sui.BUCK,
  },
  
]
const ALPHAFI_POOL2_IDS = [{
  poolID: "0x594f13b8f287003fd48e4264e7056e274b84709ada31e3657f00eeedc1547e37",
  parentPoolID: "0xda7347c3192a27ddac32e659c9d9cbed6f8c9d1344e605c71c8886d7b787d720",
  investorID: "0x46d901d5e1dba34103038bd2ba789b775861ea0bf4d6566afd5029cf466a3d88",
  token0Type: "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA",
  token1Type: ADDRESSES.sui.SUI
},
{
  poolID: "0x430986b53a787362e54fa83d0ae046a984fb4285a1bc4fb1335af985f4fe019d",
  parentPoolID: "0x0cbe3e6bbac59a93e4d358279dff004c98b2b8da084729fabb9831b1c9f71db6",
  investorID: "0x705c560fd1f05c64e0480af05853e27e1c3d04e255cd6c5cb6921f5d1df12b5a",
  token0Type: "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA",
  token1Type: ADDRESSES.sui.USDC
},
{
  poolID: "0x4c0e42f1826170ad9283b321a7f9a453ef9f65aaa626f7d9ee5837726664ecdc",
  parentPoolID: "0x29e218b46e35b4cf8eedc7478b8795d2a9bcce9c61e11101b3a039ec93305126",
  investorID: "0xb43d1defd5f76ef084d68d6b56e903b54d0a3b01be8bb920ed1fa84b42c32ee1",
  token0Type: "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA",
  token1Type: ADDRESSES.sui.USDC_CIRCLE
},
{ //alpha usdc
  poolID: "0x4540c5e7de64088c0c2c30abc51f7e6bbe6bc48703667c108aa1de23f6aa40e6",
  parentPoolID: "0x6595edf6d8c8b6894a5c6760843ae2fde81cb37d8586984dd1345b0f00bfecd8",
  investorID: "0x187ca6f373d20465a730125c93e62a96c6a73354a1a8b35cbdd2b39278b7b141",
  token0Type: "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA",
  token1Type: ADDRESSES.sui.USDC_CIRCLE
},
]

const ALPHA_POOL_ID = "0x6ee8f60226edf48772f81e5986994745dae249c2605a5b12de6602ef1b05b0c1"
const ALPHA_COIN_TYPE = "0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA"

function asIntN(int, bits = 32) {
  return Number(BigInt.asIntN(bits, BigInt(int)))
}

async function addPoolTVL(api, alphafiDoubleAssetPools) {
  for (const { poolID, parentPoolID, investorID, token0Type, token1Type } of alphafiDoubleAssetPools) {
    let investorObject = await sui.getObject(investorID)
    let poolObject = await sui.getObject(poolID)
    let parentPoolObject = await sui.getObject(parentPoolID)
    addUniV3LikePosition({
      api,
      tickLower: asIntN(investorObject.fields.lower_tick),
      tickUpper: asIntN(investorObject.fields.upper_tick),
      tick: asIntN(parentPoolObject.fields.current_tick_index.fields.bits),
      liquidity: poolObject.fields.tokensInvested,
      token0: token0Type,
      token1: token1Type
    })
  }
}

async function addPoolTVL2(api, alphafiNaviPools){
 
  for (const { poolID, tokenType, expo } of alphafiNaviPools){
    let poolObject = await sui.getObject(poolID);
    let tokensInvested = poolObject.fields.tokensInvested;
    let balance = BigInt(tokensInvested)/BigInt(Math.pow(10, 9-expo));
    api.add(tokenType, balance);
  }
}

async function addPoolTVL3(api, alphafiNaviLoopPools){
 
  for (const { poolID, investorID, tokenType, expo } of alphafiNaviLoopPools){
    let poolObject = await sui.getObject(poolID);
    let investorObject = await sui.getObject(investorID);
    let tokensInvested = poolObject.fields.tokensInvested;
    
    let liquidity = parseFloat(tokensInvested);
    /*
    in the code below, we are subtracting the debt in the pool from the liquidity, since the borrowed tokens are supplied back to the pool (as part of our strategy).
    we have current_debt_to_supply_ratio in the object, so current debt in the system is (current liquidity * current_debt_to_supply_ratio).
    we subtract the above derived debt from the liquidity.
    current_debt_to_supply_ratio in our system is scaled by 1e20, hence the division of 1e20 in the below used expression.
    */
    liquidity = liquidity*(1-(parseFloat(investorObject.fields.current_debt_to_supply_ratio)/parseFloat(1e20)));
    
    tokensInvested = (liquidity.toString().split('.')[0]);
    
    let balance = BigInt(tokensInvested)/BigInt(Math.pow(10, 9-expo));
    api.add(tokenType, balance);
  }
}

async function addPoolTVL4(api, alphafiBucketPools){
 
  for (const { poolID, tokenType } of alphafiBucketPools){
    let poolObject = await sui.getObject(poolID);
    let tokensInvested = poolObject.fields.tokensInvested;
    api.add(tokenType, tokensInvested);
  }
}

async function tvl(api) {
  
  await Promise.all([addPoolTVL(api, ALPHAFI_CETUS_TVL_IDS), addPoolTVL2(api, ALPHAFI_NAVI_TVL_IDS), addPoolTVL3(api, ALPHAFI_NAVI_LOOP_TVL_IDS), addPoolTVL4(api, ALPHAFI_BUCKET_TVL_IDS), addPoolTVL(api, ALPHAFI_BLUEFIN_TVL_IDS), addPoolTVL(api, ALPHAFI_BLUEFIN_AUTOBALANCE_TVL_IDS)]);

}
async function pool2(api) {

  await addPoolTVL(api, ALPHAFI_POOL2_IDS)
  
}


async function staking(api) {
  let alphaPoolObject = await sui.getObject(ALPHA_POOL_ID)
  api.addToken(ALPHA_COIN_TYPE, BigInt(alphaPoolObject.fields.alpha_bal))
}

module.exports = {
  timetravel: false,
  doublecounted: true,
  sui: {
    tvl, pool2, staking,
  },
}