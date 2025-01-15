type Theme = 'light' | 'dark';
type DeviceType = 'destop' | 'mobile' | 'unknown';
type DataSource =
    // Database sources
    | 'mysql'
    | 'postgresql'
    | 'mongodb'
    // File sources
    | 'json'
    | 'xml'
    | 'sqlite'
    // Default
    | 'none';

// Optional: Define source categories
type DatabaseSource = Extract<DataSource, 'mysql' | 'postgresql' | 'mongodb'>;
type FileSource = Extract<DataSource, 'json' | 'xml' | 'sqlite'>;