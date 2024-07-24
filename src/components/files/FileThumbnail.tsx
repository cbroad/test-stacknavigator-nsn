import {
  Image,
  ImageProps,
  View,
  ViewProps,
  useWindowDimensions,
} from 'react-native';

import smiley from '~src/assets/smiley.png';

type FileThumbnailProps = ViewProps & {
  fileId: number | null;
  imageProps?: ImageProps;
};

function FileThumbnail({
  fileId,
  style = {},
  imageProps = {},
  ...props
}: FileThumbnailProps) {
  const window = useWindowDimensions();

  return (
    <View
      style={[
        {
          overflow: 'hidden',
        },
        style,
      ]}
      {...props}
    >
      <Image
        {...imageProps}
        source={smiley}
        style={[
          {
            width: window.width / 4,
            height: (window.width / 4) * 0.56,
            zIndex: 8,
            resizeMode: 'cover',
          },
          imageProps?.style || {},
        ]}
      />
    </View>
  );
}

export { FileThumbnailProps };
export default FileThumbnail;
