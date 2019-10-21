import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton, AtImagePicker, AtSteps, AtToast } from "taro-ui";

import "./index.scss";
import Item from "./Item";

interface Props {}

interface State {
  files: Array<any>;
  current: number;
  visible: boolean;
}
export default class Index extends Component<Props, State> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  };
  convertImgToBase64 = (url, callback, outputFormat) => {
    console.log(1, url);

    var canvas = document.createElement("CANVAS"),
      ctx = canvas.getContext("2d"),
      img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL(outputFormat || "image/png");
      callback.call(this, dataURL);
      canvas = null;
    };
    img.src = url;
  };
  state = {
    files: [],
    current: 0,
    visible: false
  };
  constructor() {
    super(...arguments);
  }
  onChange(files) {
    this.setState({
      files
    });
  }
  onFail(mes) {
    console.log(mes);
  }
  onImageClick(index, file) {
    console.log(index, file);
    this.convertImgToBase64(
      file.url,
      function(base64Img) {
        // Base64DataURL
        console.log(base64Img);
      },
      file.type
    );
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const items = [
      { title: "步骤一", desc: "选择图片" },
      { title: "步骤二", desc: "查看结果" }
    ];
    const { current, visible, files } = this.state;
    const isFirstPage = current === 0;
    return (
      <View>
        <View className="doc-header">
          <View className="doc-header__title">明日方舟公招计算器</View>
        </View>
        <View className="doc-body">
          <AtSteps className="panel" items={items} current={current} />
          {isFirstPage && (
            <View className="panel">
              <View className="panel__title">选择Tag图片</View>
              <AtImagePicker
                length={5}
                multiple
                files={files}
                onChange={this.onChange.bind(this)}
                onFail={this.onFail.bind(this)}
                onImageClick={this.onImageClick.bind(this)}
              />
            </View>
          )}
          {!isFirstPage && (
            <View className="panel">
              <View className="panel__title">计算结果</View>
              <Item />
              <Item />
            </View>
          )}
          <AtToast
            isOpened={visible}
            text="loading"
            icon="loading"
            status="loading"
            hasMask
          ></AtToast>
        </View>

        <AtButton
          onClick={() => {
            this.setState(
              isFirstPage ? { current: 1 } : { current: 0, files: [] }
            );
          }}
          type="primary"
        >
          {isFirstPage ? "下一步" : "再来一次"}
        </AtButton>
      </View>
    );
  }
}
