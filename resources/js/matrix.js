'use strict';

function Matrix (array) {
	this.mat = array;
	//console.log(array);
	this.rows = (typeof array === 'undefined') ? 0 : array.length;
	this.cols = (typeof array === 'undefined') ? 0 : array[0].length;
}

Matrix.prototype.identity = function() {
	this.mat = [ [1, 0, 0, 0], 
				 [0, 1, 0, 0],
				 [0, 0, 1, 0],
				 [0, 0, 0, 1] ];
	this.rows = 4;
	this.cols = 4;
}

Matrix.prototype.mult = function(other, transformation) {
	var res = [];
	for (var row = 0; row < this.rows; row ++) {
		res[row] = [];
		for (var o_col = 0; o_col < other.cols; o_col ++) {
			var sum = 0;
			for (var col = 0; col < this.cols; col ++) {
				sum += this.mat[row][col] * other.mat[col][o_col];
			}
			res[row].push(sum)
		}
	}

	//transformation is an optional parameter specifying whether the result of the 
	//matrix multiplication should be written to the input column vector.
	if (typeof transformation === 'undefined') {
		this.mat = res;
	} else {
		other.mat = res;
	}
}

Matrix.prototype.transpose = function() {
	var matrix = this.mat;
	var temp;
	for (var i = 0; i < matrix.length - 1; i ++) {
		for (var j = i + 1; j < matrix.length; j ++) {
			temp = matrix[i][j];
			matrix[i][j] = matrix[j][i];
			matrix[j][i] = temp;
		}
	}
	
	this.mat = matrix;
}

Matrix.prototype.translate = function(a, b, c) {
	var translMat = new Matrix();
	translMat.identity();
	var transl = translMat.mat;
	transl[0][3] = a;
	transl[1][3] = b;
	transl[2][3] = c;

	this.mult(translMat);
}

Matrix.prototype.rotateX = function(a) {
	var rotXMat = new Matrix();
	rotXMat.identity();
	var rotX = rotXMat.mat;
	rotX[1][1] = Math.cos(a), rotX[1][2] = -Math.sin(a);
	rotX[2][1] = Math.sin(a), rotX[2][2] = Math.cos(a);

	this.mult(rotXMat);
}

Matrix.prototype.rotateY = function(a) {
	var rotYMat = new Matrix();
	rotYMat.identity();
	var rotY = rotYMat.mat;
	rotY[0][0] = Math.cos(a), rotY[0][2] = Math.sin(a);
	rotY[2][0] = -Math.sin(a), rotY[2][2] = Math.cos(a);

	this.mult(rotYMat);
}

Matrix.prototype.rotateZ = function(a) {
	var rotZMat = new Matrix();
	rotZMat.identity();
	var rotZ = rotZMat.mat;
	rotZ[0][0] = Math.cos(a), rotZ[0][1] = -Math.sin(a);
	rotZ[1][0] = Math.sin(a), rotZ[1][1] = Math.cos(a);

	this.mult(rotZMat);
}

Matrix.prototype.scale = function(a, b, c) {
	b = (typeof b === 'undefined') ? a : b;
	c = (typeof c === 'undefined') ? a : c;
	var sclMat = new Matrix();
	sclMat.identity();
	var scl = sclMat.mat;
	scl[0][0] = a, scl[1][1] = b, scl[2][2] = c;

	this.mult(sclMat);
}

Matrix.prototype.transform = function(point) {
	var p = new Matrix([ [point[0]], [point[1]], [point[2]], [1] ]);
	this.mult(p, true);
	return p.mat;
}

/*
 var a = new Matrix([ [1, 2, 3, 4], 
				 [0, 1, 0, 0],
				 [0, 0, 1, 0],
				 [0, 0, 0, 1] ]);

a.transform([1, 2, 3]);
console.log(a.mat);
*/