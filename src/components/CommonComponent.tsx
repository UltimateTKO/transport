"use client";
import { PropsWithChildren } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

type GroupLabelProps = PropsWithChildren<{
	required: boolean;
	label: string;
	style?: React.CSSProperties;
}>;

type ComboProps = {
	id: string;
	list: { [key: string]: string }[];
	showKey: boolean;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	readOnly?: boolean;
	className?: string;
	defaultValue?: string;
	value?: string;
};

type InputProps = {
	id: string;
	type?: string;
	defaultValue?: string;
	value?: string;
	className?: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	maxLength?: number;
	pattern?: string;
	textAlign?: "left" | "center" | "right";
};

type TextAreaProps = {
	id: string;
	defaultValue: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	rows?: number;
};

type RadioProps = {
	id: string;
	list: { [key: string]: string }[];
	defaultCheckIndex?: number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
};

type DateRangeProps = {
	id: string;
	defaultFromValue?: string;
	defaultToValue?: string;
};

export const RequiredMark = () => <span className="required-mark">■</span>;

// コンボボックスコンポーネント（そのまま／必要なら onChange, readOnly を反映）
export const CommonComboBox = ({
	id,
	list,
	showKey,
	onChange,
	readOnly,
	className,
	value,
	defaultValue,
}: ComboProps) => (
	<Form.Select
		size="sm"
		id={id}
		onChange={onChange as any}
		disabled={readOnly}
		className={className}
		value={value}
		defaultValue={defaultValue}
	>
		{
			/* 空optionをセットしておく */
			<option value=""></option>
		}
		{
			/* listを設定する */
			list.map((item) => (
				<option key={item["key"]?.trim() ?? item["value"].trim()} value={item["key"]?.trim() ?? item["value"].trim()}>
					{showKey ? `${item["key"]?.trim()}:` : ""}
					{item["value"].trim()}
				</option>
			))
		}
	</Form.Select>
);

// コンボボックスコンポーネント（そのまま／必要なら onChange, readOnly を反映）
export const CommonComboBoxInputable = ({ id, list, showKey, onChange, readOnly, className, value }: ComboProps) => {
	// react-select に渡す option 配列を先に作成
	const options = list.map((item) => ({
		value: item["key"]?.trim() ?? item["value"].trim(),
		label: showKey ? `${item["key"]?.trim()}: ${item["value"].trim()}` : item["value"].trim(),
	}));

	// defaultValue があれば、value が一致する option を探してセット
	const valueOption = value ? options.find((opt) => opt.value === value) : null;

	return (
		<CreatableSelect
			id={id}
			inputId={id} // ラベルと紐づけたい場合はこちら
			isClearable={true}
			isDisabled={readOnly}
			className={className}
			value={valueOption as any}
			options={options as any}
			// ★ react-select の onChange から擬似イベントを作って元の onChange に渡す
			onChange={(newValue: any) => {
				const value = newValue?.value ?? "";
				if (onChange) {
					const syntheticEvent = {
						target: { value },
					} as React.ChangeEvent<HTMLSelectElement>;
					onChange(syntheticEvent);
				}
			}}
		/>
	);
};

// 入力ボックスコンポーネント（GroupLabelを内包しない）
export const CommonInputBox = ({
	id,
	type = "text",
	defaultValue,
	value,
	className,
	placeholder,
	onChange,
	readOnly = false,
	onBlur,
	maxLength,
	pattern,
	textAlign,
}: InputProps) => (
	<Form.Control
		id={id}
		className={className}
		defaultValue={defaultValue}
		value={value}
		placeholder={placeholder}
		size="sm"
		type={type}
		onChange={onChange}
		readOnly={readOnly}
		onBlur={onBlur}
		maxLength={maxLength}
		pattern={pattern}
		style={textAlign ? { textAlign: textAlign } : {}}
	/>
);

// テキストエリアコンポーネント（GroupLabelを内包しない）
export const CommonTextAreaBox = ({ id, rows, defaultValue, onChange, readOnly = false }: TextAreaProps) => (
	<Form.Control
		as="textarea"
		id={id}
		defaultValue={defaultValue}
		rows={rows}
		size="sm"
		onChange={onChange as any}
		readOnly={readOnly}
	/>
);

// ラジオボタンコンポーネント（GroupLabelを内包しない）
export const CommonRadio = ({ id, list, defaultCheckIndex, onChange, readOnly = false }: RadioProps) => (
	<div className="panel-choice-group" id={id}>
		{list.map((vehicleType, index) => (
			// ラジオは <Form.Check type="radio"> に
			<Form.Label key={vehicleType["key"].trim()} className="panel-choice">
				<Form.Check
					type="radio"
					name={id}
					defaultChecked={index === defaultCheckIndex}
					onChange={onChange}
					disabled={readOnly}
				/>
				<span>{vehicleType["value"].trim()}</span>
			</Form.Label>
		))}
	</div>
);

// 日付範囲コンポーネント（GroupLabelを内包しない）
export const CommonDateRangeBox = ({ id, defaultFromValue, defaultToValue }: DateRangeProps) => (
	<div className="d-flex align-items-center gap-2" id={id}>
		<Form.Control defaultValue={defaultFromValue} className="w-auto" size="sm" type="date" />
		<span className="text-muted">~</span>
		<Form.Control defaultValue={defaultToValue} className="w-auto" size="sm" type="date" />
	</div>
);

// グループラベルコンポーネント（呼び出し側で必要に応じてラップ）
export const CommonGroupLabel = ({ required, label, children, style }: GroupLabelProps) => (
	<Form.Group className={`panel-field required`} style={style}>
		<Form.Label className="panel-field-label">
			{required ? <RequiredMark /> : null}
			{label}
		</Form.Label>
		{children}
	</Form.Group>
);
