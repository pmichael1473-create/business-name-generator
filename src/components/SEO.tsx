import React, { useEffect } from 'react';
import { MetadataProps, updateMetadata } from '../utils/metadata';

const SEO: React.FC<MetadataProps> = (props) => {
  useEffect(() => {
    updateMetadata(props);
  }, [props]);

  return null;
};

export default SEO;
