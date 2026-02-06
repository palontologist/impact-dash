# Custom Metrics and Data Input Features

## Overview

This update enhances the Impact Dashboard with comprehensive custom metric selection and flexible data input capabilities during onboarding and throughout dashboard usage.

## New Features

### 1. Custom Impact Profile

When users select the **"Custom"** profile during onboarding, they now have access to:

- **Custom Metric Selector**: Browse and select from 25+ pre-defined metrics across 6 categories:
  - Education (enrollment, completion rates, employment, etc.)
  - Human Constitution (dignity index, wellbeing, mental health, etc.)
  - Food Distribution (meals provided, communities served, etc.)
  - Environmental (GHG emissions, water efficiency, energy usage, etc.)
  - Social Impact (jobs created, training programs, partnerships, etc.)
  - Governance (donor retention, stakeholder engagement, transparency, etc.)

- **Visual Category Browsing**: Metrics are organized by tabs for easy navigation
- **Multi-Select**: Choose any combination of metrics relevant to your organization
- **Metric Details**: Each metric shows category, unit type, and description

### 2. Data Input Configuration

Users can now choose their preferred data input method:

#### CSV Upload
- **Bulk Import**: Upload historical data quickly via CSV files
- **Auto-Mapping**: Automatic column mapping based on metric IDs
- **Validation**: Built-in data validation and error reporting
- **Upload History**: Track all previous uploads with success/failure rates
- **Template Download**: Pre-formatted CSV template for easy data preparation

#### Manual Input
- **Real-Time Entry**: Add data points through intuitive forms
- **Contextual Notes**: Add notes and insights to each data point
- **Quick Updates**: Perfect for daily or periodic metric tracking
- **Validation**: Automatic data type and range validation

#### Both Methods
- **Flexible Workflow**: Use CSV for historical data and manual input for updates
- **Best of Both Worlds**: Combine batch imports with real-time tracking

### 3. Enhanced Onboarding Flow

The onboarding wizard now includes:
- **Dynamic Steps**: Additional steps appear only when "Custom" profile is selected
- **Progress Tracking**: Visual progress bar adapts to profile choice
- **Smart Navigation**: Conditional navigation based on selections
- **Data Persistence**: All selections saved to user profile

**Standard Profile**: 4 steps
1. User Type Selection
2. Profile Selection
3. Industry Selection
4. Use Case Selection

**Custom Profile**: 6 steps
1. User Type Selection
2. Profile Selection
3. **Custom Metric Selection** ← NEW
4. **Data Input Configuration** ← NEW
5. Industry Selection
6. Use Case Selection

### 4. Enhanced Data Input Panel

The dashboard's data input panel now includes:
- **Custom Metrics Tab**: Dedicated interface for custom metric data entry
- **CSV Bulk Import**: Drag-and-drop CSV upload with real-time feedback
- **API Integration**: RESTful API endpoints for external integrations
- **Success Feedback**: Clear validation and success messages

## Database Schema Updates

### New Tables

**available_metrics**
- Stores all available metrics that can be selected
- Includes metric metadata (name, category, unit, data type)
- Pre-populated with 25+ standard metrics

**data_uploads**
- Tracks all CSV file uploads
- Stores upload status, rows processed, and error logs
- Maintains file hashes to prevent duplicates

**custom_metric_data**
- Stores all custom metric data points
- Links to user profiles and uploads
- Supports both manual and CSV-sourced data
- Includes notes and timestamps

**user_profiles** (updated)
- Added `custom_metrics` field (JSON array of selected metric IDs)
- Added `data_input_method` field (csv, manual, or both)

## API Endpoints

### Data Input Endpoints

**POST** `/api/data/manual-input`
- Submit individual metric data points
- Request body: `{ metricId, value, date, notes }`
- Returns: Created metric data with ID

**GET** `/api/data/manual-input`
- Retrieve metric data for current user
- Query params: `metricId` (optional), `limit` (default: 100)
- Returns: Array of metric data points

**PUT** `/api/data/manual-input`
- Update existing metric data
- Request body: `{ id, value, notes }`
- Returns: Updated metric data

**DELETE** `/api/data/manual-input?id={id}`
- Delete a specific metric data point
- Returns: Success confirmation

**POST** `/api/data/upload-csv`
- Upload and process CSV file
- Form data: `file`, `metricMapping` (optional)
- Returns: Upload summary with success/error counts

**GET** `/api/data/upload-csv`
- Get all CSV uploads for current user
- Returns: Array of upload records with status

### Updated Onboarding Endpoint

**POST** `/api/onboarding`
- Now accepts: `customMetrics` and `dataInputMethod` fields
- Stores custom profile configuration

## CSV File Format

### Required Columns
- `date` - Date in YYYY-MM-DD format

### Metric Columns
- Column headers should match metric IDs (e.g., `enrollment`, `completion`, `ghg_emissions`)
- Numeric values for quantitative metrics
- One row per time period

### Example CSV
```csv
date,enrollment,completion,employment,ghg_emissions
2026-01-01,250,78.5,64.2,1250
2026-02-01,285,81.2,68.7,1380
2026-03-01,312,83.5,72.1,1520
```

## Usage Instructions

### For New Users (Onboarding)

1. Select your user type (Consultant, Enterprise, or Regulator)
2. Choose **"Custom"** as your impact profile
3. **Select Your Metrics**:
   - Browse metrics by category using tabs
   - Click on metric cards to select/deselect
   - Select at least one metric to continue
4. **Configure Data Input**:
   - Choose your preferred method: CSV Upload, Manual Input, or Both
   - Review the benefits of each method
5. Complete remaining onboarding steps

### For Data Input (Dashboard)

#### Manual Input
1. Navigate to the Data Input panel
2. Select the **"Custom Metrics"** tab
3. Choose a metric from the dropdown
4. Enter the value and date
5. Optionally add notes
6. Click "Save Metric Data"

#### CSV Upload
1. Navigate to the Data Input panel
2. Select the **"Bulk Import"** tab
3. Download the CSV template (optional)
4. Prepare your CSV file with metric data
5. Drag and drop or click to upload
6. Review upload results

## Migration

Run the database migration to add new tables:

```bash
# Apply migration
npm run db:push

# Or manually run the migration SQL
sqlite3 local.db < drizzle/0003_add_custom_metrics_support.sql
```

## Future Enhancements

- Auto-detect CSV column mapping
- Scheduled CSV imports
- Data validation rules per metric
- Metric formulas and calculations
- Data visualization for custom metrics
- Export functionality
- Bulk edit capabilities
- Data quality scoring
- Integration with Google Sheets/Excel
- Mobile-optimized data entry

## Components Reference

- `custom-metric-selector.tsx` - Multi-select interface for choosing metrics
- `data-input-config.tsx` - Configuration UI for data input methods
- `data-input-panel.tsx` - Enhanced data input interface with custom metrics support
- `onboarding-wizard.tsx` - Updated wizard with conditional custom profile steps

## Technical Notes

- All metric data is scoped to user profiles
- CSV parsing uses simple comma-split (consider using a CSV library for production)
- File hash prevents duplicate uploads
- Data validation happens on both client and server
- Metrics are extensible - new metrics can be added to the database
- Supports multiple data sources (manual, CSV, API) per user

## Support

For issues or questions about these features:
1. Check the in-app documentation
2. Review API endpoint responses for error details
3. Consult the database schema in `lib/schema.ts`
4. Check migration files in `drizzle/` directory
