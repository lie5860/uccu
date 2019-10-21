import Taro, { Component } from "@tarojs/taro";
import { AtAccordion, AtList, AtCard, AtTag, AtRate, AtGrid } from "taro-ui";
export default class Item extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      open: true
    };
  }
  handleClick(value) {
    this.setState({
      open: value
    });
  }
  render() {
    return (
      <AtAccordion
        open={this.state.open}
        onClick={this.handleClick.bind(this)}
        title={
          <div>
            <AtTag active circle>
              标签
            </AtTag>
            <AtTag active circle>
              标签
            </AtTag>
            <AtTag active circle>
              标签
            </AtTag>
            <AtTag active circle>
              标签
            </AtTag>
            <AtTag active circle>
              标签
            </AtTag>
          </div>
        }
      >
        <AtList hasBorder={false}>
          <AtCard
            extra={<AtRate size="10" value={3} max={6} />}
            title={
              <div>
                <AtTag active circle>
                  标签
                </AtTag>
                <AtTag active circle>
                  标签
                </AtTag>
                <AtTag active circle>
                  标签
                </AtTag>
              </div>
            }
          >
            <div>
              <AtTag className="licon-blue" type="primary" active>
                标签
              </AtTag>
              <AtTag type="primary" active>
                标签
              </AtTag>
              <AtTag type="primary" active>
                标签
              </AtTag>
            </div>
          </AtCard>
        </AtList>
      </AtAccordion>
    );
  }
}
