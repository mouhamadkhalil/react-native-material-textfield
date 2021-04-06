import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const getHTML = (svgContent, style) => `
<html data-key="key-${style.height}-${style.width}">
  <head>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: transparent;
      }
      svg {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    ${svgContent}
  </body>
</html>
`;

class Svg extends PureComponent {

  state = {
    fetchingUrl: null,
    svgContent: null
  };

  componentDidMount() {
      this.doFetch(this.props);
  }

  componentDidUpdate(prevProps) {
    const prevUri = prevProps.source && prevProps.source.uri;
    const nextUri = this.props.source && this.props.source.uri;

    if (nextUri && prevUri !== nextUri) {
      this.doFetch(this.props);
    }
  }

  doFetch = async props => {
    let uri = props.source && props.source.uri;
    if (uri) {
      props.onLoadStart && props.onLoadStart();
      if (uri.match(/^data:image\/svg/)) {
        const index = uri.indexOf('<svg');
        this.setState({ fetchingUrl: uri, svgContent: uri.slice(index) });
      } else {
        try {
          const res = await fetch(uri);
          const text = await res.text();
          this.setState({ fetchingUrl: uri, svgContent: text });
        } catch (err) {
          console.error('got error', err);
        }
      }
      props.onLoadEnd && props.onLoadEnd();
    }
  };

  render() {
    const props = this.props;
    const source = resolveAssetSource(props.source);
    if (source && (source.uri && source.uri.match('.svg'))) {
      const style = props.style || {};
      if (source.__packager_asset && typeof style !== 'number') {
        if (!style.width) {
          style.width = source.width;
        }
        if (!style.height) {
          style.height = source.height;
        }
      }

      const { svgContent } = this.state;
      if (svgContent) {
        const flattenedStyle = StyleSheet.flatten(props.style) || {};
        const html = getHTML(svgContent, flattenedStyle);

        return (
          <View pointerEvents="none" style={[props.style, props.containerStyle]}>
            <WebView
              originWhitelist={['*']}
              scalesPageToFit={true}
              useWebKit={false}
              style={[
                {
                  width: 200,
                  height: 100,
                  backgroundColor: 'transparent',
                  Opacity: 0.99
                },
                props.style,
              ]}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              source={{ html }}
              androidHardwareAccelerationDisabled={true}
            />
          </View>
        );
      } else {
        return (
          <View
            pointerEvents="none"
            style={[props.containerStyle, props.style]}
          />
        );
      }
    } else {
      return <Image {...props} />;
    }
  }
}

export default Svg;

